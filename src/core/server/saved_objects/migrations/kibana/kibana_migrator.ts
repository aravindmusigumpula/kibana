/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * This file contains the logic for managing the Kibana index version
 * (the shape of the mappings and documents in the index).
 */

import { KibanaConfigType } from 'src/core/server/kibana_config';
import { BehaviorSubject } from 'rxjs';

import { Logger } from '../../../logging';
import { IndexMapping, SavedObjectsTypeMappingDefinitions } from '../../mappings';
import { SavedObjectUnsanitizedDoc, SavedObjectsSerializer } from '../../serialization';
import { buildActiveMappings, IndexMigrator, MigrationResult, MigrationStatus } from '../core';
import { DocumentMigrator, VersionedTransformer } from '../core/document_migrator';
import { MigrationEsClient } from '../core/';
import { createIndexMap } from '../core/build_index_map';
import { SavedObjectsMigrationConfigType } from '../../saved_objects_config';
import { ISavedObjectTypeRegistry } from '../../saved_objects_type_registry';
import { SavedObjectsType } from '../../types';

export interface KibanaMigratorOptions {
  client: MigrationEsClient;
  typeRegistry: ISavedObjectTypeRegistry;
  savedObjectsConfig: SavedObjectsMigrationConfigType;
  kibanaConfig: KibanaConfigType;
  kibanaVersion: string;
  logger: Logger;
}

export type IKibanaMigrator = Pick<KibanaMigrator, keyof KibanaMigrator>;

export interface KibanaMigratorStatus {
  status: MigrationStatus;
  result?: MigrationResult[];
}

/**
 * Manages the shape of mappings and documents in the Kibana index.
 */
export class KibanaMigrator {
  private readonly client: MigrationEsClient;
  private readonly savedObjectsConfig: SavedObjectsMigrationConfigType;
  private readonly documentMigrator: VersionedTransformer;
  private readonly kibanaConfig: KibanaConfigType;
  private readonly log: Logger;
  private readonly mappingProperties: SavedObjectsTypeMappingDefinitions;
  private readonly typeRegistry: ISavedObjectTypeRegistry;
  private readonly serializer: SavedObjectsSerializer;
  private migrationResult?: Promise<MigrationResult[]>;
  private readonly status$ = new BehaviorSubject<KibanaMigratorStatus>({
    status: 'waiting',
  });
  private readonly activeMappings: IndexMapping;

  /**
   * Creates an instance of KibanaMigrator.
   */
  constructor({
    client,
    typeRegistry,
    kibanaConfig,
    savedObjectsConfig,
    kibanaVersion,
    logger,
  }: KibanaMigratorOptions) {
    this.client = client;
    this.kibanaConfig = kibanaConfig;
    this.savedObjectsConfig = savedObjectsConfig;
    this.typeRegistry = typeRegistry;
    this.serializer = new SavedObjectsSerializer(this.typeRegistry);
    this.mappingProperties = mergeTypes(this.typeRegistry.getAllTypes());
    this.log = logger;
    this.documentMigrator = new DocumentMigrator({
      kibanaVersion,
      typeRegistry,
      log: this.log,
    });
    // Building the active mappings (and associated md5sums) is an expensive
    // operation so we cache the result
    this.activeMappings = buildActiveMappings(this.mappingProperties);
  }

  /**
   * Migrates the mappings and documents in the Kibana index. By default, this will run only
   * once and subsequent calls will return the result of the original call.
   *
   * @param rerun - If true, method will run a new migration when called again instead of
   * returning the result of the initial migration. This should only be used when factors external
   * to Kibana itself alter the kibana index causing the saved objects mappings or data to change
   * after the Kibana server performed the initial migration.
   *
   * @remarks When the `rerun` parameter is set to true, no checks are performed to ensure that no migration
   * is currently running. Chained or concurrent calls to `runMigrations({ rerun: true })` can lead to
   * multiple migrations running at the same time. When calling with this parameter, it's expected that the calling
   * code should ensure that the initial call resolves before calling the function again.
   *
   * @returns - A promise which resolves once all migrations have been applied.
   *    The promise resolves with an array of migration statuses, one for each
   *    elasticsearch index which was migrated.
   */
  public runMigrations({ rerun = false }: { rerun?: boolean } = {}): Promise<
    Array<{ status: string }>
  > {
    if (this.migrationResult === undefined || rerun) {
      // Reruns are only used by CI / EsArchiver. Publishing status updates on reruns results in slowing down CI
      // unnecessarily, so we skip it in this case.
      if (!rerun) {
        this.status$.next({ status: 'running' });
      }

      this.migrationResult = this.runMigrationsInternal().then((result) => {
        // Similar to above, don't publish status updates when rerunning in CI.
        if (!rerun) {
          this.status$.next({ status: 'completed', result });
        }
        return result;
      });
    }

    return this.migrationResult;
  }

  public getStatus$() {
    return this.status$.asObservable();
  }

  private runMigrationsInternal() {
    const kibanaIndexName = this.kibanaConfig.index;
    const indexMap = createIndexMap({
      kibanaIndexName,
      indexMap: this.mappingProperties,
      registry: this.typeRegistry,
    });

    const migrators = Object.keys(indexMap).map((index) => {
      return new IndexMigrator({
        batchSize: this.savedObjectsConfig.batchSize,
        client: this.client,
        documentMigrator: this.documentMigrator,
        index,
        log: this.log,
        mappingProperties: indexMap[index].typeMappings,
        pollInterval: this.savedObjectsConfig.pollInterval,
        scrollDuration: this.savedObjectsConfig.scrollDuration,
        serializer: this.serializer,
        // Only necessary for the migrator of the kibana index.
        obsoleteIndexTemplatePattern:
          index === kibanaIndexName ? 'kibana_index_template*' : undefined,
        convertToAliasScript: indexMap[index].script,
      });
    });

    return Promise.all(migrators.map((migrator) => migrator.migrate()));
  }

  /**
   * Gets all the index mappings defined by Kibana's enabled plugins.
   *
   */
  public getActiveMappings(): IndexMapping {
    return this.activeMappings;
  }

  /**
   * Migrates an individual doc to the latest version, as defined by the plugin migrations.
   *
   * @param doc - The saved object to migrate
   * @returns `doc` with all registered migrations applied.
   */
  public migrateDocument(doc: SavedObjectUnsanitizedDoc): SavedObjectUnsanitizedDoc {
    return this.documentMigrator.migrate(doc);
  }
}

/**
 * Merges savedObjectMappings properties into a single object, verifying that
 * no mappings are redefined.
 */
export function mergeTypes(types: SavedObjectsType[]): SavedObjectsTypeMappingDefinitions {
  return types.reduce((acc, { name: type, mappings }) => {
    const duplicate = acc.hasOwnProperty(type);
    if (duplicate) {
      throw new Error(`Type ${type} is already defined.`);
    }
    return {
      ...acc,
      [type]: mappings,
    };
  }, {});
}