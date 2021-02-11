/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IRouter } from 'src/core/server';

export const registerGetAllTagsRoute = (router: IRouter) => {
  router.get(
    {
      path: '/api/saved_objects_tagging/tags',
      validate: {},
    },
    router.handleLegacyErrors(async (ctx, req, res) => {
      const tags = await ctx.tags!.tagsClient.getAll();
      return res.ok({
        body: {
          tags,
        },
      });
    })
  );
};