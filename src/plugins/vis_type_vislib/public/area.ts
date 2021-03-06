/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';
// @ts-ignore
import { palettes } from '@elastic/eui/lib/services';
// @ts-ignore
import { euiPaletteColorBlind } from '@elastic/eui/lib/services';

import { AggGroupNames } from '../../data/public';
import { Schemas } from '../../vis_default_editor/public';
import {
  Positions,
  ChartTypes,
  ChartModes,
  InterpolationModes,
  AxisTypes,
  ScaleTypes,
  AxisModes,
  ThresholdLineStyles,
  getConfigCollections,
} from './utils/collections';
import { getAreaOptionTabs, countLabel } from './utils/common_config';
import { Rotates } from '../../charts/public';
import { BaseVisTypeOptions, VIS_EVENT_TO_TRIGGER } from '../../../plugins/visualizations/public';
import { toExpressionAst } from './to_ast';
import { BasicVislibParams } from './types';

export const areaVisTypeDefinition: BaseVisTypeOptions<BasicVislibParams> = {
  name: 'area',
  title: i18n.translate('visTypeVislib.area.areaTitle', { defaultMessage: 'Area' }),
  icon: 'visArea',
  description: i18n.translate('visTypeVislib.area.areaDescription', {
    defaultMessage: 'Emphasize the data between an axis and a line.',
  }),
  getSupportedTriggers: () => [VIS_EVENT_TO_TRIGGER.filter, VIS_EVENT_TO_TRIGGER.brush],
  toExpressionAst,
  visConfig: {
    defaults: {
      type: 'area',
      grid: {
        categoryLines: false,
      },
      categoryAxes: [
        {
          id: 'CategoryAxis-1',
          type: AxisTypes.CATEGORY,
          position: Positions.BOTTOM,
          show: true,
          style: {},
          scale: {
            type: ScaleTypes.LINEAR,
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100,
          },
          title: {},
        },
      ],
      valueAxes: [
        {
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: AxisTypes.VALUE,
          position: Positions.LEFT,
          show: true,
          style: {},
          scale: {
            type: ScaleTypes.LINEAR,
            mode: AxisModes.NORMAL,
          },
          labels: {
            show: true,
            rotate: Rotates.HORIZONTAL,
            filter: false,
            truncate: 100,
          },
          title: {
            text: countLabel,
          },
        },
      ],
      seriesParams: [
        {
          show: true,
          type: ChartTypes.AREA,
          mode: ChartModes.STACKED,
          data: {
            label: countLabel,
            id: '1',
          },
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          showCircles: true,
          interpolate: InterpolationModes.LINEAR,
          valueAxis: 'ValueAxis-1',
        },
      ],
      addTooltip: true,
      addLegend: true,
      legendPosition: Positions.RIGHT,
      times: [],
      addTimeMarker: false,
      thresholdLine: {
        show: false,
        value: 10,
        width: 1,
        style: ThresholdLineStyles.FULL,
        color: euiPaletteColorBlind()[9],
      },
      labels: {},
    },
  },
  editorConfig: {
    collections: getConfigCollections(),
    optionTabs: getAreaOptionTabs(),
    schemas: new Schemas([
      {
        group: AggGroupNames.Metrics,
        name: 'metric',
        title: i18n.translate('visTypeVislib.area.metricsTitle', {
          defaultMessage: 'Y-axis',
        }),
        aggFilter: ['!geo_centroid', '!geo_bounds'],
        min: 1,
        defaults: [{ schema: 'metric', type: 'count' }],
      },
      {
        group: AggGroupNames.Metrics,
        name: 'radius',
        title: i18n.translate('visTypeVislib.area.radiusTitle', {
          defaultMessage: 'Dot size',
        }),
        min: 0,
        max: 1,
        aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality'],
      },
      {
        group: AggGroupNames.Buckets,
        name: 'segment',
        title: i18n.translate('visTypeVislib.area.segmentTitle', {
          defaultMessage: 'X-axis',
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter'],
      },
      {
        group: AggGroupNames.Buckets,
        name: 'group',
        title: i18n.translate('visTypeVislib.area.groupTitle', {
          defaultMessage: 'Split series',
        }),
        min: 0,
        max: 3,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter'],
      },
      {
        group: AggGroupNames.Buckets,
        name: 'split',
        title: i18n.translate('visTypeVislib.area.splitTitle', {
          defaultMessage: 'Split chart',
        }),
        min: 0,
        max: 1,
        aggFilter: ['!geohash_grid', '!geotile_grid', '!filter'],
      },
    ]),
  },
};
