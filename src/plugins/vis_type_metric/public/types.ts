/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Range } from '../../expressions/public';
import { SchemaConfig } from '../../visualizations/public';
import { ColorModes, Labels, Style, ColorSchemas } from '../../charts/public';

export const visType = 'metric';

export interface DimensionsVisParam {
  metrics: SchemaConfig[];
  bucket?: SchemaConfig;
}

export interface MetricVisParam {
  percentageMode: boolean;
  useRanges: boolean;
  colorSchema: ColorSchemas;
  metricColorMode: ColorModes;
  colorsRange: Range[];
  labels: Labels;
  invertColors: boolean;
  style: Style;
}

export interface VisParams {
  addTooltip: boolean;
  addLegend: boolean;
  dimensions: DimensionsVisParam;
  metric: MetricVisParam;
  type: typeof visType;
}

export interface MetricVisMetric {
  value: any;
  label: string;
  color?: string;
  bgColor?: string;
  lightText: boolean;
  rowIndex: number;
}