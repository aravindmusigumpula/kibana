/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { extname } from 'path';
import { Readable } from 'stream';
import { schema } from '@kbn/config-schema';
import { IRouter } from '../../http';
import { CoreUsageDataSetup } from '../../core_usage_data';
import { resolveSavedObjectsImportErrors } from '../import';
import { SavedObjectConfig } from '../saved_objects_config';
import { createSavedObjectsStreamFromNdJson } from './utils';

interface RouteDependencies {
  config: SavedObjectConfig;
  coreUsageData: CoreUsageDataSetup;
}

interface FileStream extends Readable {
  hapi: {
    filename: string;
  };
}

export const registerResolveImportErrorsRoute = (
  router: IRouter,
  { config, coreUsageData }: RouteDependencies
) => {
  const { maxImportExportSize, maxImportPayloadBytes } = config;

  router.post(
    {
      path: '/_resolve_import_errors',
      options: {
        body: {
          maxBytes: maxImportPayloadBytes,
          output: 'stream',
          accepts: 'multipart/form-data',
        },
      },
      validate: {
        query: schema.object({
          createNewCopies: schema.boolean({ defaultValue: false }),
        }),
        body: schema.object({
          file: schema.stream(),
          retries: schema.arrayOf(
            schema.object({
              type: schema.string(),
              id: schema.string(),
              overwrite: schema.boolean({ defaultValue: false }),
              destinationId: schema.maybe(schema.string()),
              replaceReferences: schema.arrayOf(
                schema.object({
                  type: schema.string(),
                  from: schema.string(),
                  to: schema.string(),
                }),
                { defaultValue: [] }
              ),
              createNewCopy: schema.maybe(schema.boolean()),
              ignoreMissingReferences: schema.maybe(schema.boolean()),
            })
          ),
        }),
      },
    },
    router.handleLegacyErrors(async (context, req, res) => {
      const { createNewCopies } = req.query;

      const usageStatsClient = coreUsageData.getClient();
      usageStatsClient
        .incrementSavedObjectsResolveImportErrors({ request: req, createNewCopies })
        .catch(() => {});

      const file = req.body.file as FileStream;
      const fileExtension = extname(file.hapi.filename).toLowerCase();
      if (fileExtension !== '.ndjson') {
        return res.badRequest({ body: `Invalid file extension ${fileExtension}` });
      }

      let readStream: Readable;
      try {
        readStream = await createSavedObjectsStreamFromNdJson(file);
      } catch (e) {
        return res.badRequest({
          body: e,
        });
      }

      const result = await resolveSavedObjectsImportErrors({
        typeRegistry: context.core.savedObjects.typeRegistry,
        savedObjectsClient: context.core.savedObjects.client,
        readStream,
        retries: req.body.retries,
        objectLimit: maxImportExportSize,
        createNewCopies,
      });

      return res.ok({ body: result });
    })
  );
};