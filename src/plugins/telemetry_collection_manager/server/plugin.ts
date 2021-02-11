/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UsageCollectionSetup } from 'src/plugins/usage_collection/server';
import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  IClusterClient,
  SavedObjectsServiceStart,
  ILegacyClusterClient,
} from 'src/core/server';

import {
  TelemetryCollectionManagerPluginSetup,
  TelemetryCollectionManagerPluginStart,
  BasicStatsPayload,
  CollectionStrategyConfig,
  CollectionStrategy,
  StatsGetterConfig,
  StatsCollectionConfig,
  UsageStatsPayload,
  StatsCollectionContext,
} from './types';
import { isClusterOptedIn } from './util';
import { encryptTelemetry } from './encryption';

interface TelemetryCollectionPluginsDepsSetup {
  usageCollection: UsageCollectionSetup;
}

export class TelemetryCollectionManagerPlugin
  implements Plugin<TelemetryCollectionManagerPluginSetup, TelemetryCollectionManagerPluginStart> {
  private readonly logger: Logger;
  private collectionStrategy: CollectionStrategy<any> | undefined;
  private usageGetterMethodPriority = -1;
  private usageCollection?: UsageCollectionSetup;
  private legacyElasticsearchClient?: ILegacyClusterClient;
  private elasticsearchClient?: IClusterClient;
  private savedObjectsService?: SavedObjectsServiceStart;
  private readonly isDistributable: boolean;
  private readonly version: string;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
    this.isDistributable = initializerContext.env.packageInfo.dist;
    this.version = initializerContext.env.packageInfo.version;
  }

  public setup(core: CoreSetup, { usageCollection }: TelemetryCollectionPluginsDepsSetup) {
    this.usageCollection = usageCollection;

    return {
      setCollectionStrategy: this.setCollectionStrategy.bind(this),
      getOptInStats: this.getOptInStats.bind(this),
      getStats: this.getStats.bind(this),
      areAllCollectorsReady: this.areAllCollectorsReady.bind(this),
    };
  }

  public start(core: CoreStart) {
    this.legacyElasticsearchClient = core.elasticsearch.legacy.client; // TODO: Remove when all the collectors have migrated
    this.elasticsearchClient = core.elasticsearch.client;
    this.savedObjectsService = core.savedObjects;

    return {
      getOptInStats: this.getOptInStats.bind(this),
      getStats: this.getStats.bind(this),
      areAllCollectorsReady: this.areAllCollectorsReady.bind(this),
    };
  }

  public stop() {}

  private setCollectionStrategy<T extends BasicStatsPayload>(
    collectionConfig: CollectionStrategyConfig<T>
  ) {
    const { title, priority, statsGetter, clusterDetailsGetter } = collectionConfig;

    if (typeof priority !== 'number') {
      throw new Error('priority must be set.');
    }
    if (priority === this.usageGetterMethodPriority) {
      throw new Error(`A Usage Getter with the same priority is already set.`);
    }

    if (priority > this.usageGetterMethodPriority) {
      if (!statsGetter) {
        throw Error('Stats getter method not set.');
      }
      if (!clusterDetailsGetter) {
        throw Error('Cluster UUIds method is not set.');
      }

      this.logger.debug(`Setting ${title} as the telemetry collection strategy`);

      // Overwrite the collection strategy
      this.collectionStrategy = collectionConfig;
      this.usageGetterMethodPriority = priority;
    }
  }

  /**
   * Returns the context to provide to the Collection Strategies.
   * It may return undefined if the ES and SO clients are not initialised yet.
   * @param config {@link StatsGetterConfig}
   * @param usageCollection {@link UsageCollectionSetup}
   * @private
   */
  private getStatsCollectionConfig(
    config: StatsGetterConfig,
    usageCollection: UsageCollectionSetup
  ): StatsCollectionConfig | undefined {
    const callCluster = config.unencrypted
      ? this.legacyElasticsearchClient?.asScoped(config.request).callAsCurrentUser
      : this.legacyElasticsearchClient?.callAsInternalUser;
    // Scope the new elasticsearch Client appropriately and pass to the stats collection config
    const esClient = config.unencrypted
      ? this.elasticsearchClient?.asScoped(config.request).asCurrentUser
      : this.elasticsearchClient?.asInternalUser;
    // Scope the saved objects client appropriately and pass to the stats collection config
    const soClient = config.unencrypted
      ? this.savedObjectsService?.getScopedClient(config.request)
      : this.savedObjectsService?.createInternalRepository();
    // Provide the kibanaRequest so opted-in plugins can scope their custom clients only if the request is not encrypted
    const kibanaRequest = config.unencrypted ? config.request : void 0;

    if (callCluster && esClient && soClient) {
      return { callCluster, usageCollection, esClient, soClient, kibanaRequest };
    }
  }

  private async getOptInStats(optInStatus: boolean, config: StatsGetterConfig) {
    if (!this.usageCollection) {
      return [];
    }

    const collection = this.collectionStrategy;
    if (collection) {
      // Build the context (clients and others) to send to the CollectionStrategies
      const statsCollectionConfig = this.getStatsCollectionConfig(config, this.usageCollection);
      if (statsCollectionConfig) {
        try {
          const optInStats = await this.getOptInStatsForCollection(
            collection,
            optInStatus,
            statsCollectionConfig
          );
          if (optInStats && optInStats.length) {
            this.logger.debug(`Got Opt In stats using ${collection.title} collection.`);
            if (config.unencrypted) {
              return optInStats;
            }
            return encryptTelemetry(optInStats, { useProdKey: this.isDistributable });
          }
        } catch (err) {
          this.logger.debug(
            `Failed to collect any opt in stats with collection ${collection.title}.`
          );
        }
      }
    }

    return [];
  }

  private async areAllCollectorsReady() {
    return await this.usageCollection?.areAllCollectorsReady();
  }

  private getOptInStatsForCollection = async (
    collection: CollectionStrategy,
    optInStatus: boolean,
    statsCollectionConfig: StatsCollectionConfig
  ) => {
    const context: StatsCollectionContext = {
      logger: this.logger.get(collection.title),
      version: this.version,
    };

    const clustersDetails = await collection.clusterDetailsGetter(statsCollectionConfig, context);
    return clustersDetails.map(({ clusterUuid }) => ({
      cluster_uuid: clusterUuid,
      opt_in_status: optInStatus,
    }));
  };

  private async getStats(config: StatsGetterConfig) {
    if (!this.usageCollection) {
      return [];
    }
    const collection = this.collectionStrategy;
    if (collection) {
      // Build the context (clients and others) to send to the CollectionStrategies
      const statsCollectionConfig = this.getStatsCollectionConfig(config, this.usageCollection);
      if (statsCollectionConfig) {
        try {
          const usageData = await this.getUsageForCollection(collection, statsCollectionConfig);
          if (usageData.length) {
            this.logger.debug(`Got Usage using ${collection.title} collection.`);
            if (config.unencrypted) {
              return usageData;
            }

            return encryptTelemetry(usageData.filter(isClusterOptedIn), {
              useProdKey: this.isDistributable,
            });
          }
        } catch (err) {
          this.logger.debug(
            `Failed to collect any usage with registered collection ${collection.title}.`
          );
        }
      }
    }

    return [];
  }

  private async getUsageForCollection(
    collection: CollectionStrategy,
    statsCollectionConfig: StatsCollectionConfig
  ): Promise<UsageStatsPayload[]> {
    const context: StatsCollectionContext = {
      logger: this.logger.get(collection.title),
      version: this.version,
    };

    const clustersDetails = await collection.clusterDetailsGetter(statsCollectionConfig, context);

    if (clustersDetails.length === 0) {
      // don't bother doing a further lookup.
      return [];
    }

    const stats = await collection.statsGetter(clustersDetails, statsCollectionConfig, context);

    // Add the `collectionSource` to the resulting payload
    return stats.map((stat) => ({ collectionSource: collection.title, ...stat }));
  }
}