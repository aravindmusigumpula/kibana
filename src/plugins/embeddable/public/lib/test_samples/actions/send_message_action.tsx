/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiFlyoutBody } from '@elastic/eui';
import { createAction, IncompatibleActionError, ActionType } from '../../ui_actions';
import { CoreStart } from '../../../../../../core/public';
import { toMountPoint } from '../../../../../kibana_react/public';
import { Embeddable, EmbeddableInput } from '../../embeddables';
import { GetMessageModal } from './get_message_modal';
import { FullNameEmbeddableOutput, hasFullNameOutput } from './say_hello_action';

// Casting to ActionType is a hack - in a real situation use
// declare module and add this id to ActionContextMapping.
export const ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE' as ActionType;

interface ActionContext {
  embeddable: Embeddable<EmbeddableInput, FullNameEmbeddableOutput>;
  message: string;
}

const isCompatible = async (context: ActionContext) => hasFullNameOutput(context.embeddable);

export function createSendMessageAction(overlays: CoreStart['overlays']) {
  const sendMessage = async (context: ActionContext, message: string) => {
    const greeting = `Hello, ${context.embeddable.getOutput().fullName}`;

    const content = message ? `${greeting}. ${message}` : greeting;
    overlays.openFlyout(toMountPoint(<EuiFlyoutBody>{content}</EuiFlyoutBody>));
  };

  return createAction<typeof ACTION_SEND_MESSAGE>({
    type: ACTION_SEND_MESSAGE,
    getDisplayName: () => 'Send message',
    isCompatible,
    execute: async (context: ActionContext) => {
      if (!(await isCompatible(context))) {
        throw new IncompatibleActionError();
      }

      const modal = overlays.openModal(
        toMountPoint(
          <GetMessageModal
            onCancel={() => modal.close()}
            onDone={(message) => {
              modal.close();
              sendMessage(context, message);
            }}
          />
        )
      );
    },
  });
}