/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/**
 * The identifier in a saved object's `namespaces` array when it is shared globally to all spaces.
 */
export const ALL_SPACES_ID = '*';

/**
 * The identifier in a saved object's `namespaces` array when it is shared to an unknown space (e.g., one that the end user is not authorized to see).
 */
export const UNKNOWN_SPACE = '?';

export const GLOBAL_RESOURCE = '*';
export const APPLICATION_PREFIX = 'kibana-';
export const RESERVED_PRIVILEGES_APPLICATION_WILDCARD = 'kibana-*';

export const AUTH_PROVIDER_HINT_QUERY_STRING_PARAMETER = 'auth_provider_hint';
export const LOGOUT_PROVIDER_QUERY_STRING_PARAMETER = 'provider';
export const LOGOUT_REASON_QUERY_STRING_PARAMETER = 'msg';
export const NEXT_URL_QUERY_STRING_PARAMETER = 'next';