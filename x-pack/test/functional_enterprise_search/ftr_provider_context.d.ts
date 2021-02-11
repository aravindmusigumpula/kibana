/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { GenericFtrProviderContext } from '@kbn/test/types/ftr';

import { pageObjects } from './page_objects';
import { services } from './services';

export type FtrProviderContext = GenericFtrProviderContext<typeof services, typeof pageObjects>;