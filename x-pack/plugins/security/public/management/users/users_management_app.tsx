/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Router, Route, Switch, useParams } from 'react-router-dom';
import { i18n } from '@kbn/i18n';
import { StartServicesAccessor } from 'src/core/public';
import { RegisterManagementAppArgs } from '../../../../../../src/plugins/management/public';
import { AuthenticationServiceSetup } from '../../authentication';
import { PluginStartDependencies } from '../../plugin';
import { tryDecodeURIComponent } from '../url_utils';

interface CreateParams {
  authc: AuthenticationServiceSetup;
  getStartServices: StartServicesAccessor<PluginStartDependencies>;
}

export const usersManagementApp = Object.freeze({
  id: 'users',
  create({ authc, getStartServices }: CreateParams) {
    return {
      id: this.id,
      order: 10,
      title: i18n.translate('xpack.security.management.usersTitle', { defaultMessage: 'Users' }),
      async mount({ element, setBreadcrumbs, history }) {
        const [coreStart] = await getStartServices();
        const usersBreadcrumbs = [
          {
            text: i18n.translate('xpack.security.users.breadcrumb', { defaultMessage: 'Users' }),
            href: `/`,
          },
        ];

        const [
          [{ http, notifications, i18n: i18nStart }],
          { UsersGridPage },
          { EditUserPage },
          { UserAPIClient },
          { RolesAPIClient },
        ] = await Promise.all([
          getStartServices(),
          import('./users_grid'),
          import('./edit_user'),
          import('./user_api_client'),
          import('../roles'),
        ]);

        const userAPIClient = new UserAPIClient(http);
        const rolesAPIClient = new RolesAPIClient(http);
        const UsersGridPageWithBreadcrumbs = () => {
          setBreadcrumbs(usersBreadcrumbs);
          return (
            <UsersGridPage
              notifications={notifications}
              userAPIClient={userAPIClient}
              rolesAPIClient={rolesAPIClient}
              history={history}
              navigateToApp={coreStart.application.navigateToApp}
            />
          );
        };

        const EditUserPageWithBreadcrumbs = () => {
          const { username } = useParams<{ username?: string }>();

          // Additional decoding is a workaround for a bug in react-router's version of the `history` module.
          // See https://github.com/elastic/kibana/issues/82440
          const decodedUsername = username ? tryDecodeURIComponent(username) : undefined;

          setBreadcrumbs([
            ...usersBreadcrumbs,
            username
              ? { text: decodedUsername, href: `/edit/${encodeURIComponent(username)}` }
              : {
                  text: i18n.translate('xpack.security.users.createBreadcrumb', {
                    defaultMessage: 'Create',
                  }),
                },
          ]);

          return (
            <EditUserPage
              authc={authc}
              userAPIClient={userAPIClient}
              rolesAPIClient={new RolesAPIClient(http)}
              notifications={notifications}
              username={decodedUsername}
              history={history}
            />
          );
        };

        render(
          <i18nStart.Context>
            <Router history={history}>
              <Switch>
                <Route path={['/', '']} exact>
                  <UsersGridPageWithBreadcrumbs />
                </Route>
                <Route path="/edit/:username?">
                  <EditUserPageWithBreadcrumbs />
                </Route>
              </Switch>
            </Router>
          </i18nStart.Context>,
          element
        );

        return () => {
          unmountComponentAtNode(element);
        };
      },
    } as RegisterManagementAppArgs;
  },
});
