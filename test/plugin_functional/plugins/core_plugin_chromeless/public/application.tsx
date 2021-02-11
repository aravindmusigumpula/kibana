/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from '@elastic/eui';

import { AppMountContext, AppMountParameters } from 'kibana/public';

const Home = () => (
  <EuiPageBody data-test-subj="chromelessAppHome">
    <EuiPageHeader>
      <EuiPageHeaderSection>
        <EuiTitle size="l">
          <h1>Welcome to Chromeless!</h1>
        </EuiTitle>
      </EuiPageHeaderSection>
    </EuiPageHeader>
    <EuiPageContent>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Chromeless home page section title</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>Where did all the chrome go?</EuiPageContentBody>
    </EuiPageContent>
  </EuiPageBody>
);

const ChromelessApp = ({ basename }: { basename: string; context: AppMountContext }) => (
  <Router basename={basename}>
    <EuiPage>
      <Route path="/" component={Home} />
    </EuiPage>
  </Router>
);

export const renderApp = (
  context: AppMountContext,
  { appBasePath, element }: AppMountParameters
) => {
  render(<ChromelessApp basename={appBasePath} context={context} />, element);

  return () => unmountComponentAtNode(element);
};
