/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import gql from 'graphql-tag';

export const deleteTimelineMutation = gql`
  mutation DeleteTimelineMutation($id: [ID!]!) {
    deleteTimeline(id: $id)
  }
`;