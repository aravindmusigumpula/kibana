/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { inspectorPluginMock } from '../mocks';
import { DataAdapter, RequestAdapter } from '../../common/adapters';

const adapter1 = new DataAdapter();
const adapter2 = new RequestAdapter();

describe('inspector', () => {
  describe('isAvailable()', () => {
    it('should return false if no view would be available', async () => {
      const { doStart } = await inspectorPluginMock.createPlugin();
      const start = await doStart();
      expect(start.isAvailable({ adapter1 })).toBe(false);
    });

    it('should return true if views would be available, false otherwise', async () => {
      const { setup, doStart } = await inspectorPluginMock.createPlugin();

      setup.registerView({
        title: 'title',
        help: 'help',
        shouldShow(adapters: any) {
          return 'adapter1' in adapters;
        },
      } as any);

      const start = await doStart();

      expect(start.isAvailable({ adapter1 })).toBe(true);
      expect(start.isAvailable({ adapter2 })).toBe(false);
    });
  });
});
