/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';
import { parse } from 'hjson';
import type { BaseVisTypeOptions } from 'src/plugins/visualizations/public';

import { DefaultEditorSize } from '../../vis_default_editor/public';
import type { VegaVisualizationDependencies } from './plugin';

import { createVegaRequestHandler } from './vega_request_handler';
import { getDefaultSpec } from './default_spec';
import { extractIndexPatternsFromSpec } from './lib/extract_index_pattern';
import { createInspectorAdapters } from './vega_inspector';
import { VIS_EVENT_TO_TRIGGER, VisGroups } from '../../visualizations/public';
import { toExpressionAst } from './to_ast';
import { getInfoMessage } from './components/experimental_map_vis_info';
import { VegaVisEditorComponent } from './components/vega_vis_editor_lazy';

import type { VegaSpec } from './data_model/types';
import type { VisParams } from './vega_fn';

export const createVegaTypeDefinition = (
  dependencies: VegaVisualizationDependencies
): BaseVisTypeOptions<VisParams> => {
  const requestHandler = createVegaRequestHandler(dependencies);

  return {
    name: 'vega',
    title: 'Vega',
    getInfoMessage,
    description: i18n.translate('visTypeVega.type.vegaDescription', {
      defaultMessage: 'Use Vega to create new types of visualizations.',
      description: 'Vega and Vega-Lite are product names and should not be translated',
    }),
    note: i18n.translate('visTypeVega.type.vegaNote', {
      defaultMessage: 'Requires knowledge of Vega syntax.',
    }),
    icon: 'visVega',
    group: VisGroups.PROMOTED,
    titleInWizard: i18n.translate('visTypeVega.type.vegaTitleInWizard', {
      defaultMessage: 'Custom visualization',
    }),
    visConfig: { defaults: { spec: getDefaultSpec() } },
    editorConfig: {
      optionsTemplate: VegaVisEditorComponent,
      enableAutoApply: true,
      defaultSize: DefaultEditorSize.MEDIUM,
    },
    requestHandler,
    toExpressionAst,
    options: {
      showIndexSelection: false,
      showQueryBar: true,
      showFilterBar: true,
    },
    getSupportedTriggers: () => {
      return [VIS_EVENT_TO_TRIGGER.applyFilter];
    },
    getUsedIndexPattern: async (visParams) => {
      try {
        const spec = parse(visParams.spec, { legacyRoot: false, keepWsc: true });

        return extractIndexPatternsFromSpec(spec as VegaSpec);
      } catch (e) {
        // spec is invalid
      }
      return [];
    },
    inspectorAdapters: createInspectorAdapters,
  };
};
