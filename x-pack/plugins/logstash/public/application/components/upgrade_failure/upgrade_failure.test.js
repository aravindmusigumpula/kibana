/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { shallowWithIntl, mountWithIntl } from '@kbn/test/jest';
import { UpgradeFailure } from './upgrade_failure';

describe('UpgradeFailure component', () => {
  let props;
  let onClose;
  let onRetry;

  beforeEach(() => {
    onClose = jest.fn();
    onRetry = jest.fn();

    props = {
      isManualUpgrade: true,
      isNewPipeline: true,
      onClose,
      onRetry,
    };
  });

  it('renders component as expected', () => {
    const wrapper = shallowWithIntl(<UpgradeFailure {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes expected text for new pipeline', () => {
    const wrapper = mountWithIntl(<UpgradeFailure {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes expected text for not new pipeline', () => {
    props.isNewPipeline = false;
    const wrapper = mountWithIntl(<UpgradeFailure {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes expected text for not manual upgrade', () => {
    props.isManualUpgrade = false;
    const wrapper = mountWithIntl(<UpgradeFailure {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('propogates onClose and onRetry functions to child', () => {
    const wrapper = mountWithIntl(<UpgradeFailure {...props} />);
    expect(wrapper.find('UpgradeFailureActions').props().onClose).toEqual(onClose);
    expect(wrapper.find('UpgradeFailureActions').props().onRetry).toEqual(onRetry);
  });
});
