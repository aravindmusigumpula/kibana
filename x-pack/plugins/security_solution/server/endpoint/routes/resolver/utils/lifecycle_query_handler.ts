/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { SearchResponse } from 'elasticsearch';
import { ILegacyScopedClusterClient } from 'kibana/server';
import { SafeResolverEvent, SafeResolverLifecycleNode } from '../../../../../common/endpoint/types';
import { LifecycleQuery } from '../queries/lifecycle';
import { QueryInfo } from '../queries/multi_searcher';
import { SingleQueryHandler } from './fetch';
import { createLifecycle } from './node';

/**
 * Retrieve the lifecycle events for a node.
 */
export class LifecycleQueryHandler implements SingleQueryHandler<SafeResolverLifecycleNode> {
  private lifecycle: SafeResolverLifecycleNode | undefined;
  private readonly query: LifecycleQuery;
  constructor(
    private readonly entityID: string,
    indexPattern: string,
    legacyEndpointID: string | undefined
  ) {
    this.query = new LifecycleQuery(indexPattern, legacyEndpointID);
  }

  private handleResponse = (response: SearchResponse<SafeResolverEvent>) => {
    const results = this.query.formatResponse(response);
    if (results.length !== 0) {
      this.lifecycle = createLifecycle(this.entityID, results);
    }
  };

  /**
   * Build the query for retrieving the lifecycle events. This will return undefined once the results have been found.
   */
  nextQuery(): QueryInfo | undefined {
    if (this.getResults()) {
      return;
    }

    return {
      query: this.query,
      ids: this.entityID,
      handler: this.handleResponse,
    };
  }

  /**
   * Get the results from the msearch.
   */
  getResults(): SafeResolverLifecycleNode | undefined {
    return this.lifecycle;
  }

  /**
   * Do a regular search and return the results.
   *
   * @param client the elasticsearch client.
   */
  async search(client: ILegacyScopedClusterClient) {
    const results = this.getResults();
    if (results) {
      return results;
    }

    this.handleResponse(await this.query.search(client, this.entityID));
    return this.getResults() ?? createLifecycle(this.entityID, []);
  }
}
