/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { memo, useState, BaseSyntheticEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';

import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiPopover,
  keys,
  EuiIcon,
  EuiSpacer,
  EuiButtonEmpty,
  EuiPopoverProps,
  EuiButtonGroup,
  EuiButtonGroupOptionProps,
} from '@elastic/eui';

import { legendColors, LegendItem } from './models';

interface Props {
  item: LegendItem;
  legendId: string;
  selected: boolean;
  canFilter: boolean;
  anchorPosition: EuiPopoverProps['anchorPosition'];
  onFilter: (item: LegendItem, negate: boolean) => void;
  onSelect: (label: string | null) => (event?: BaseSyntheticEvent) => void;
  onHighlight: (event: BaseSyntheticEvent) => void;
  onUnhighlight: (event: BaseSyntheticEvent) => void;
  setColor: (label: string, color: string) => (event: BaseSyntheticEvent) => void;
  getColor: (label: string) => string;
}

const VisLegendItemComponent = ({
  item,
  legendId,
  selected,
  canFilter,
  anchorPosition,
  onFilter,
  onSelect,
  onHighlight,
  onUnhighlight,
  setColor,
  getColor,
}: Props) => {
  const [idToSelectedMap, setIdToSelectedMap] = useState({});
  /**
   * Keydown listener for a legend entry.
   * This will close the details panel of this legend entry when pressing Escape.
   */
  const onLegendEntryKeydown = (event: KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      onSelect(null)();
    }
  };

  const filterOptions: EuiButtonGroupOptionProps[] = [
    {
      id: 'filterIn',
      label: i18n.translate('visTypeVislib.vislib.legend.filterForValueButtonAriaLabel', {
        defaultMessage: 'Filter for value {legendDataLabel}',
        values: { legendDataLabel: item.label },
      }),
      iconType: 'plusInCircle',
      'data-test-subj': `legend-${item.label}-filterIn`,
    },
    {
      id: 'filterOut',
      label: i18n.translate('visTypeVislib.vislib.legend.filterOutValueButtonAriaLabel', {
        defaultMessage: 'Filter out value {legendDataLabel}',
        values: { legendDataLabel: item.label },
      }),
      iconType: 'minusInCircle',
      'data-test-subj': `legend-${item.label}-filterOut`,
    },
  ];

  const handleFilterChange = (id: string) => {
    setIdToSelectedMap({ filterIn: id === 'filterIn', filterOut: id === 'filterOut' });
    onFilter(item, id !== 'filterIn');
  };

  const renderFilterBar = () => (
    <>
      <EuiButtonGroup
        type="multi"
        isIconOnly
        isFullWidth
        legend={i18n.translate('visTypeVislib.vislib.legend.filterOptionsLegend', {
          defaultMessage: '{legendDataLabel}, filter options',
          values: { legendDataLabel: item.label },
        })}
        options={filterOptions}
        onChange={handleFilterChange}
        data-test-subj={`legend-${item.label}-filters`}
        idToSelectedMap={idToSelectedMap}
      />
      <EuiSpacer size="s" />
    </>
  );

  const button = (
    <EuiButtonEmpty
      size="xs"
      color="text"
      flush="left"
      className="visLegend__button"
      onKeyDown={onLegendEntryKeydown}
      onMouseEnter={onHighlight}
      onFocus={onHighlight}
      onClick={onSelect(item.label)}
      onMouseLeave={onUnhighlight}
      onBlur={onUnhighlight}
      data-label={item.label}
      title={item.label}
      aria-label={i18n.translate('visTypeVislib.vislib.legend.toggleOptionsButtonAriaLabel', {
        defaultMessage: '{legendDataLabel}, toggle options',
        values: { legendDataLabel: item.label },
      })}
      data-test-subj={`legend-${item.label}`}
    >
      <EuiIcon
        size="l"
        type="dot"
        color={getColor(item.label)}
        data-test-subj={`legendSelectedColor-${getColor(item.label)}`}
      />
      <span className="visLegend__valueTitle">{item.label}</span>
    </EuiButtonEmpty>
  );

  const renderDetails = () => (
    <EuiPopover
      display="block"
      button={button}
      isOpen={selected}
      anchorPosition={anchorPosition}
      closePopover={onSelect(null)}
      panelPaddingSize="s"
    >
      <div className="visLegend__valueDetails">
        {canFilter && renderFilterBar()}

        <div className="visLegend__valueColorPicker" role="listbox">
          <span id={`${legendId}ColorPickerDesc`} className="euiScreenReaderOnly">
            <FormattedMessage
              id="visTypeVislib.vislib.legend.setColorScreenReaderDescription"
              defaultMessage="Set color for value {legendDataLabel}"
              values={{ legendDataLabel: item.label }}
            />
          </span>
          {legendColors.map((color) => (
            <EuiIcon
              role="option"
              tabIndex={0}
              type="dot"
              size="l"
              color={getColor(item.label)}
              key={color}
              aria-label={color}
              aria-describedby={`${legendId}ColorPickerDesc`}
              aria-selected={color === getColor(item.label)}
              onClick={setColor(item.label, color)}
              onKeyPress={setColor(item.label, color)}
              className={classNames('visLegend__valueColorPickerDot', {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'visLegend__valueColorPickerDot-isSelected': color === getColor(item.label),
              })}
              style={{ color }}
              data-test-subj={`legendSelectColor-${color}`}
            />
          ))}
        </div>
      </div>
    </EuiPopover>
  );

  return (
    <li key={item.label} className="visLegend__value">
      {renderDetails()}
    </li>
  );
};

export const VisLegendItem = memo(VisLegendItemComponent);