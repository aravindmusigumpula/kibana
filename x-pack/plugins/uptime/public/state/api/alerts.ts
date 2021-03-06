/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { CLIENT_ALERT_TYPES } from '../../../common/constants/alerts';
import { apiService } from './utils';
import { ActionConnector } from '../alerts/alerts';

import { AlertsResult, MonitorIdParam } from '../actions/types';
import { Alert, AlertAction, ActionType } from '../../../../triggers_actions_ui/public';
import { API_URLS } from '../../../common/constants';

import { populateAlertActions } from './alert_actions';

const UPTIME_AUTO_ALERT = 'UPTIME_AUTO';

export const fetchConnectors = async () => {
  return await apiService.get(API_URLS.ALERT_ACTIONS);
};

export interface NewAlertParams {
  monitorId: string;
  monitorName?: string;
  defaultActions: ActionConnector[];
}

type NewMonitorStatusAlert = Omit<
  Alert,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'apiKey'
  | 'apiKeyOwner'
  | 'muteAll'
  | 'mutedInstanceIds'
  | 'executionStatus'
>;

export const createAlert = async ({
  defaultActions,
  monitorId,
  monitorName,
}: NewAlertParams): Promise<Alert> => {
  const actions: AlertAction[] = populateAlertActions({ defaultActions, monitorId, monitorName });

  const data: NewMonitorStatusAlert = {
    actions,
    params: {
      numTimes: 1,
      timerangeUnit: 'm',
      timerangeCount: 1,
      shouldCheckStatus: true,
      shouldCheckAvailability: false,
      isAutoGenerated: true,
      search: `monitor.id : ${monitorId} `,
      filters: { 'url.port': [], 'observer.geo.name': [], 'monitor.type': [], tags: [] },
    },
    consumer: 'uptime',
    alertTypeId: CLIENT_ALERT_TYPES.MONITOR_STATUS,
    schedule: { interval: '1m' },
    notifyWhen: 'onActionGroupChange',
    tags: [UPTIME_AUTO_ALERT],
    name: `${monitorName} (Simple status alert)`,
    enabled: true,
    throttle: null,
  };

  return await apiService.post(API_URLS.CREATE_ALERT, data);
};

export const fetchMonitorAlertRecords = async (): Promise<AlertsResult> => {
  const data = {
    page: 1,
    per_page: 500,
    filter: 'alert.attributes.alertTypeId:(xpack.uptime.alerts.monitorStatus)',
    default_search_operator: 'AND',
    sort_field: 'name.keyword',
    sort_order: 'asc',
    search_fields: ['name', 'tags'],
    search: 'UPTIME_AUTO',
  };
  return await apiService.get(API_URLS.ALERTS_FIND, data);
};

export const fetchAlertRecords = async ({ monitorId }: MonitorIdParam): Promise<Alert> => {
  const data = {
    page: 1,
    per_page: 500,
    filter: 'alert.attributes.alertTypeId:(xpack.uptime.alerts.durationAnomaly)',
    default_search_operator: 'AND',
    sort_field: 'name.keyword',
    sort_order: 'asc',
  };
  const alerts = await apiService.get(API_URLS.ALERTS_FIND, data);
  return alerts.data.find((alert: Alert) => alert.params.monitorId === monitorId);
};

export const disableAlertById = async ({ alertId }: { alertId: string }) => {
  return await apiService.delete(API_URLS.ALERT + alertId);
};

export const fetchActionTypes = async (): Promise<ActionType[]> => {
  return await apiService.get(API_URLS.ACTION_TYPES);
};
