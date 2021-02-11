/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiBadge, EuiFlyoutBody } from '@elastic/eui';
import { CoreStart } from 'src/core/public';
import { createAction, ActionByType } from '../../actions';
import { toMountPoint, reactToUiComponent } from '../../../../kibana_react/public';
import { ActionType } from '../../types';

const ReactMenuItem: React.FC = () => {
  return (
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem>Hello world!</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiBadge color={'danger'}>{'secret'}</EuiBadge>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const UiMenuItem = reactToUiComponent(ReactMenuItem);

// Casting to ActionType is a hack - in a real situation use
// declare module and add this id to ActionContextMapping.
export const ACTION_HELLO_WORLD = 'ACTION_HELLO_WORLD' as ActionType;

export function createHelloWorldAction(
  overlays: CoreStart['overlays']
): ActionByType<typeof ACTION_HELLO_WORLD> {
  return createAction<typeof ACTION_HELLO_WORLD>({
    type: ACTION_HELLO_WORLD,
    getIconType: () => 'lock',
    MenuItem: UiMenuItem,
    execute: async () => {
      overlays.openFlyout(
        toMountPoint(<EuiFlyoutBody>Hello World, I am a hello world action!</EuiFlyoutBody>),
        {
          'data-test-subj': 'helloWorldAction',
          ownFocus: true,
        }
      );
    },
  });
}