/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

import { DataTableFormat } from './data_table';
import { InspectorViewProps } from '../../../types';
import { Adapters } from '../../../../common';
import {
  TabularLoaderOptions,
  TabularData,
  TabularHolder,
} from '../../../../common/adapters/data/types';
import { IUiSettingsClient } from '../../../../../../core/public';
import { withKibana, KibanaReactContextValue } from '../../../../../kibana_react/public';

interface DataViewComponentState {
  tabularData: TabularData | null;
  tabularOptions: TabularLoaderOptions;
  adapters: Adapters;
  tabularPromise: Promise<TabularHolder> | null;
}

interface DataViewComponentProps extends InspectorViewProps {
  kibana: KibanaReactContextValue<{ uiSettings: IUiSettingsClient }>;
}

class DataViewComponent extends Component<DataViewComponentProps, DataViewComponentState> {
  static propTypes = {
    adapters: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    kibana: PropTypes.object,
  };

  state = {} as DataViewComponentState;
  _isMounted = false;

  static getDerivedStateFromProps(
    nextProps: DataViewComponentProps,
    state: DataViewComponentState
  ) {
    if (state && nextProps.adapters === state.adapters) {
      return null;
    }

    return {
      adapters: nextProps.adapters,
      tabularData: null,
      tabularOptions: {},
      tabularPromise: nextProps.adapters.data!.getTabular(),
    };
  }

  onUpdateData = (type: string) => {
    if (type === 'tabular') {
      this.setState({
        tabularData: null,
        tabularOptions: {},
        tabularPromise: this.props.adapters.data!.getTabular(),
      });
    }
  };

  async finishLoadingData() {
    const { tabularPromise } = this.state;

    if (tabularPromise) {
      const tabularData: TabularHolder = await tabularPromise;

      if (this._isMounted) {
        this.setState({
          tabularData: tabularData.data,
          tabularOptions: tabularData.options,
          tabularPromise: null,
        });
      }
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.adapters.data!.on('change', this.onUpdateData);
    this.finishLoadingData();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.adapters.data!.removeListener('change', this.onUpdateData);
  }

  componentDidUpdate() {
    this.finishLoadingData();
  }

  static renderNoData() {
    return (
      <EuiEmptyPrompt
        title={
          <h2>
            <FormattedMessage
              id="inspector.data.noDataAvailableTitle"
              defaultMessage="No data available"
            />
          </h2>
        }
        body={
          <React.Fragment>
            <p>
              <FormattedMessage
                id="inspector.data.noDataAvailableDescription"
                defaultMessage="The element did not provide any data."
              />
            </p>
          </React.Fragment>
        }
      />
    );
  }

  static renderLoading() {
    return (
      <EuiFlexGroup justifyContent="center" alignItems="center" style={{ height: '100%' }}>
        <EuiFlexItem grow={false}>
          <EuiPanel className="eui-textCenter">
            <EuiLoadingChart size="m" />
            <EuiSpacer size="s" />
            <EuiText>
              <p>
                <FormattedMessage
                  id="inspector.data.gatheringDataLabel"
                  defaultMessage="Gathering data"
                />
              </p>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  render() {
    if (this.state.tabularPromise) {
      return DataViewComponent.renderLoading();
    } else if (!this.state.tabularData) {
      return DataViewComponent.renderNoData();
    }

    return (
      <DataTableFormat
        data={this.state.tabularData}
        isFormatted={this.state.tabularOptions.returnsFormattedValues}
        exportTitle={this.props.title}
        uiSettings={this.props.kibana.services.uiSettings}
      />
    );
  }
}

// default export required for React.Lazy
// eslint-disable-next-line import/no-default-export
export default withKibana(DataViewComponent);