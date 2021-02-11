/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IFieldType } from 'src/plugins/data/common';
import { IndexPatternColumn, IncompleteColumn } from './operations';
import { IndexPatternAggRestrictions } from '../../../../../src/plugins/data/public';

export interface IndexPattern {
  id: string;
  fields: IndexPatternField[];
  getFieldByName(name: string): IndexPatternField | undefined;
  title: string;
  timeFieldName?: string;
  fieldFormatMap?: Record<
    string,
    {
      id: string;
      params: unknown;
    }
  >;
  hasRestrictions: boolean;
}

export type IndexPatternField = IFieldType & {
  displayName: string;
  aggregationRestrictions?: Partial<IndexPatternAggRestrictions>;
  meta?: boolean;
};

export interface IndexPatternLayer {
  columnOrder: string[];
  columns: Record<string, IndexPatternColumn>;
  // Each layer is tied to the index pattern that created it
  indexPatternId: string;
  // Partial columns represent the temporary invalid states
  incompleteColumns?: Record<string, IncompleteColumn>;
}

export interface IndexPatternPersistedState {
  layers: Record<string, Omit<IndexPatternLayer, 'indexPatternId'>>;
}

export interface IndexPatternPrivateState {
  currentIndexPatternId: string;
  layers: Record<string, IndexPatternLayer>;
  indexPatternRefs: IndexPatternRef[];
  indexPatterns: Record<string, IndexPattern>;

  /**
   * indexPatternId -> fieldName -> boolean
   */
  existingFields: Record<string, Record<string, boolean>>;
  isFirstExistenceFetch: boolean;
  existenceFetchFailed?: boolean;
}

export interface IndexPatternRef {
  id: string;
  title: string;
}