/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import { i18n } from '@kbn/i18n';
import { EuiLink, EuiText } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

import { VisOptionsProps } from 'src/plugins/vis_default_editor/public';
import { SelectOption } from './select';
import { SwitchOption } from './switch';
import { ColorSchemaParams } from './types';
import { ColorSchema } from '../color_maps';

export type SetColorSchemaOptionsValue = <T extends keyof ColorSchemaParams>(
  paramName: T,
  value: ColorSchemaParams[T]
) => void;

interface ColorSchemaOptionsProps extends ColorSchemaParams {
  disabled?: boolean;
  colorSchemas: ColorSchema[];
  uiState: VisOptionsProps['uiState'];
  setValue: SetColorSchemaOptionsValue;
  showHelpText?: boolean;
}

function ColorSchemaOptions({
  disabled,
  colorSchema,
  colorSchemas,
  invertColors,
  uiState,
  setValue,
  showHelpText = true,
}: ColorSchemaOptionsProps) {
  const [isCustomColors, setIsCustomColors] = useState(() => !!uiState.get('vis.colors'));

  useEffect(() => {
    uiState.on('colorChanged', () => {
      setIsCustomColors(true);
    });
  }, [uiState]);

  const resetColorsButton = (
    <EuiText size="xs">
      <EuiLink
        onClick={() => {
          uiState.set('vis.colors', null);
          setIsCustomColors(false);
        }}
      >
        <FormattedMessage
          id="charts.controls.colorSchema.resetColorsButtonLabel"
          defaultMessage="Reset colors"
        />
      </EuiLink>
    </EuiText>
  );

  return (
    <>
      <SelectOption
        disabled={disabled}
        helpText={
          showHelpText &&
          i18n.translate('charts.controls.colorSchema.howToChangeColorsDescription', {
            defaultMessage: 'Individual colors can be changed in the legend.',
          })
        }
        label={i18n.translate('charts.controls.colorSchema.colorSchemaLabel', {
          defaultMessage: 'Color schema',
        })}
        labelAppend={isCustomColors && resetColorsButton}
        options={colorSchemas}
        paramName="colorSchema"
        value={colorSchema}
        setValue={setValue}
      />

      <SwitchOption
        disabled={disabled}
        label={i18n.translate('charts.controls.colorSchema.reverseColorSchemaLabel', {
          defaultMessage: 'Reverse schema',
        })}
        paramName="invertColors"
        value={invertColors}
        setValue={setValue}
      />
    </>
  );
}

export { ColorSchemaOptions };