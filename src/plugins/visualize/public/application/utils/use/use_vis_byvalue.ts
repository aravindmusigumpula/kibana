/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EventEmitter } from 'events';
import { useEffect, useRef, useState } from 'react';
import { VisualizeInput } from 'src/plugins/visualizations/public';
import { ByValueVisInstance, IEditorController, VisualizeServices } from '../../types';
import { getVisualizationInstanceFromInput } from '../get_visualization_instance';
import { getBreadcrumbsPrefixedWithApp, getEditBreadcrumbs } from '../breadcrumbs';
import { DefaultEditorController } from '../../../../../vis_default_editor/public';

export const useVisByValue = (
  services: VisualizeServices,
  eventEmitter: EventEmitter,
  isChromeVisible: boolean | undefined,
  valueInput?: VisualizeInput,
  originatingApp?: string
) => {
  const [state, setState] = useState<{
    byValueVisInstance?: ByValueVisInstance;
    visEditorController?: IEditorController;
  }>({});
  const visEditorRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    const { chrome } = services;
    const getVisInstance = async () => {
      if (!valueInput || loaded.current || !visEditorRef.current) {
        return;
      }
      const byValueVisInstance = await getVisualizationInstanceFromInput(services, valueInput);
      const { embeddableHandler, vis } = byValueVisInstance;
      const Editor = vis.type.editor || DefaultEditorController;
      const visEditorController = new Editor(
        visEditorRef.current,
        vis,
        eventEmitter,
        embeddableHandler
      );

      if (chrome && originatingApp) {
        chrome.setBreadcrumbs(getBreadcrumbsPrefixedWithApp(originatingApp));
      } else if (chrome) {
        chrome.setBreadcrumbs(getEditBreadcrumbs());
      }

      loaded.current = true;
      setState({
        byValueVisInstance,
        visEditorController,
      });
    };

    getVisInstance();
  }, [
    eventEmitter,
    isChromeVisible,
    services,
    state.byValueVisInstance,
    state.visEditorController,
    valueInput,
    originatingApp,
  ]);

  useEffect(() => {
    return () => {
      if (state.visEditorController) {
        state.visEditorController.destroy();
      } else if (state.byValueVisInstance?.embeddableHandler) {
        state.byValueVisInstance.embeddableHandler.destroy();
      }
    };
  }, [state]);

  return {
    ...state,
    visEditorRef,
  };
};