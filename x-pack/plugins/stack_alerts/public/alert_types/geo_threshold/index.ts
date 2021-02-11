/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { lazy } from 'react';
import { i18n } from '@kbn/i18n';
import { validateExpression } from './validation';
import { GeoThresholdAlertParams } from './types';
import { AlertTypeModel } from '../../../../triggers_actions_ui/public';

export function getAlertType(): AlertTypeModel<GeoThresholdAlertParams> {
  return {
    id: '.geo-threshold',
    name: i18n.translate('xpack.stackAlerts.geoThreshold.name.trackingThreshold', {
      defaultMessage: 'Tracking threshold',
    }),
    description: i18n.translate('xpack.stackAlerts.geoThreshold.descriptionText', {
      defaultMessage: 'Alert when an entity enters or leaves a geo boundary.',
    }),
    iconClass: 'globe',
    // TODO: Add documentation for geo threshold alert
    documentationUrl: null,
    alertParamsExpression: lazy(() => import('./query_builder')),
    validate: validateExpression,
    requiresAppContext: false,
  };
}