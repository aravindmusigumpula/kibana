/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tapFirst<T>(next: (x: T) => void) {
  let isFirst = true;
  return pipe(
    tap<T>((x: T) => {
      if (isFirst) next(x);
      isFirst = false;
    })
  );
}