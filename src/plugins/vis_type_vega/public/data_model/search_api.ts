/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CoreStart, IUiSettingsClient } from 'kibana/public';
import {
  getSearchParamsFromRequest,
  SearchRequest,
  DataPublicPluginStart,
  IEsSearchResponse,
} from '../../../data/public';
import { search as dataPluginSearch } from '../../../data/public';
import { VegaInspectorAdapters } from '../vega_inspector';
import { RequestResponder } from '../../../inspector/public';

export interface SearchAPIDependencies {
  uiSettings: IUiSettingsClient;
  injectedMetadata: CoreStart['injectedMetadata'];
  search: DataPublicPluginStart['search'];
}

export class SearchAPI {
  constructor(
    private readonly dependencies: SearchAPIDependencies,
    private readonly abortSignal?: AbortSignal,
    public readonly inspectorAdapters?: VegaInspectorAdapters
  ) {}

  search(searchRequests: SearchRequest[]) {
    const { search } = this.dependencies;
    const requestResponders: any = {};

    return combineLatest(
      searchRequests.map((request) => {
        const requestId = request.name;
        const params = getSearchParamsFromRequest(request, {
          getConfig: this.dependencies.uiSettings.get.bind(this.dependencies.uiSettings),
        });

        if (this.inspectorAdapters) {
          requestResponders[requestId] = this.inspectorAdapters.requests.start(requestId, request);
          requestResponders[requestId].json(params.body);
        }

        return search
          .search(
            { params },
            { abortSignal: this.abortSignal, sessionId: search.session.getSessionId() }
          )
          .pipe(
            tap((data) => this.inspectSearchResult(data, requestResponders[requestId])),
            map((data) => ({
              name: requestId,
              rawResponse: data.rawResponse,
            }))
          );
      })
    );
  }

  public resetSearchStats() {
    if (this.inspectorAdapters) {
      this.inspectorAdapters.requests.reset();
    }
  }

  private inspectSearchResult(response: IEsSearchResponse, requestResponder: RequestResponder) {
    if (requestResponder) {
      requestResponder
        .stats(dataPluginSearch.getResponseInspectorStats(response.rawResponse))
        .ok({ json: response.rawResponse });
    }
  }
}