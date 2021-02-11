/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { ID as IndexThreshold } from './alert_types/index_threshold/alert_type';
import { GEO_THRESHOLD_ID as GeoThreshold } from './alert_types/geo_threshold/alert_type';
import { GEO_CONTAINMENT_ID as GeoContainment } from './alert_types/geo_containment/alert_type';
import { STACK_ALERTS_FEATURE_ID } from '../common';
import { DEFAULT_APP_CATEGORIES } from '../../../../src/core/server';

export const BUILT_IN_ALERTS_FEATURE = {
  id: STACK_ALERTS_FEATURE_ID,
  name: i18n.translate('xpack.stackAlerts.featureRegistry.actionsFeatureName', {
    defaultMessage: 'Stack Alerts',
  }),
  app: [],
  category: DEFAULT_APP_CATEGORIES.management,
  management: {
    insightsAndAlerting: ['triggersActions'],
  },
  alerting: [IndexThreshold, GeoThreshold, GeoContainment],
  privileges: {
    all: {
      app: [],
      catalogue: [],
      management: {
        insightsAndAlerting: ['triggersActions'],
      },
      alerting: {
        all: [IndexThreshold, GeoThreshold, GeoContainment],
        read: [],
      },
      savedObject: {
        all: [],
        read: [],
      },
      api: [],
      ui: [],
    },
    read: {
      app: [],
      catalogue: [],
      management: {
        insightsAndAlerting: ['triggersActions'],
      },
      alerting: {
        all: [],
        read: [IndexThreshold, GeoThreshold, GeoContainment],
      },
      savedObject: {
        all: [],
        read: [],
      },
      api: [],
      ui: [],
    },
  },
};