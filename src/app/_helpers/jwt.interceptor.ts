import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { State, selectAuthToken } from '../_store';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store$ = inject(Store<State>);
  let accessToken = store$.select(selectAuthToken).pipe(take(1));

  accessToken.subscribe((token) => {
    if (!token) {
      token = localStorage['token'];
    }
    if (token) {
      req = req.clone({
        setHeaders: {
          // NOTE: without the RegEx, the quotation marks (") kept getting inserted
          // into the header, I'm not sure why. I don't love this, but it works.
          Authorization: `Bearer ${token?.replace(/"/g, '')}`,
          Content: 'application/json',
        },
      });
    }
  });
  return next(req);
};
