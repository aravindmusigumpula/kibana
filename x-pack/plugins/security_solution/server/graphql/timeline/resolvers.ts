/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { AppResolverWithFields, AppResolverOf } from '../../lib/framework';
import { MutationResolvers, QueryResolvers } from '../types';
import { Timeline } from '../../lib/timeline/saved_object';
import { TimelineType } from '../../../common/types/timeline';

export type QueryTimelineResolver = AppResolverOf<QueryResolvers.GetOneTimelineResolver>;

export type QueryAllTimelineResolver = AppResolverWithFields<
  QueryResolvers.GetAllTimelineResolver,
  'totalCount' | 'timeline'
>;

export type MutationTimelineResolver = AppResolverOf<
  MutationResolvers.PersistTimelineResolver<QueryTimelineResolver>
>;

export type MutationDeleteTimelineResolver = AppResolverOf<MutationResolvers.DeleteTimelineResolver>;

export type MutationFavoriteResolver = AppResolverOf<MutationResolvers.PersistFavoriteResolver>;

interface TimelineResolversDeps {
  timeline: Timeline;
}

export const createTimelineResolvers = (
  libs: TimelineResolversDeps
): {
  Query: {
    getOneTimeline: QueryTimelineResolver;
    getAllTimeline: QueryAllTimelineResolver;
  };
  Mutation: {
    deleteTimeline: MutationDeleteTimelineResolver;
    persistTimeline: MutationTimelineResolver;
    persistFavorite: MutationFavoriteResolver;
  };
} => ({
  Query: {
    async getOneTimeline(root, args, { req }) {
      return libs.timeline.getTimeline(req, args.id, args.timelineType);
    },
    async getAllTimeline(root, args, { req }) {
      return libs.timeline.getAllTimeline(
        req,
        args.onlyUserFavorite || null,
        args.pageInfo,
        args.search || null,
        args.sort || null,
        args.status || null,
        args.timelineType || null
      );
    },
  },
  Mutation: {
    async deleteTimeline(root, args, { req }) {
      await libs.timeline.deleteTimeline(req, args.id);

      return true;
    },
    async persistFavorite(root, args, { req }) {
      return libs.timeline.persistFavorite(
        req,
        args.timelineId || null,
        args.templateTimelineId || null,
        args.templateTimelineVersion || null,
        args.timelineType || TimelineType.default
      );
    },
    async persistTimeline(root, args, { req }) {
      return libs.timeline.persistTimeline(
        req,
        args.id || null,
        args.version || null,
        args.timeline
      );
    },
  },
});