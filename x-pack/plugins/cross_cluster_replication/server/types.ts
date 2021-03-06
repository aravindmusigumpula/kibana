/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IRouter } from 'src/core/server';
import { PluginSetupContract as FeaturesPluginSetup } from '../../features/server';
import { LicensingPluginSetup } from '../../licensing/server';
import { IndexManagementPluginSetup } from '../../index_management/server';
import { RemoteClustersPluginSetup } from '../../remote_clusters/server';
import { License } from './services';
import { isEsError } from './shared_imports';
import { formatEsError } from './lib/format_es_error';

export interface Dependencies {
  licensing: LicensingPluginSetup;
  indexManagement: IndexManagementPluginSetup;
  remoteClusters: RemoteClustersPluginSetup;
  features: FeaturesPluginSetup;
}

export interface RouteDependencies {
  router: IRouter;
  license: License;
  lib: {
    isEsError: typeof isEsError;
    formatEsError: typeof formatEsError;
  };
}
