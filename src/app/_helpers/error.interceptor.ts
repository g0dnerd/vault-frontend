import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError, catchError } from 'rxjs';

import { AuthAppState } from '../_store';
import { logout } from '../_store/actions/auth.actions';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore$ = inject(Store<AuthAppState>);

  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        authStore$.dispatch(logout());
        router.navigateByUrl('/account/login');
      }

      const error = err.error?.message || err.statusText;
      return throwError(() => error);
    })
  );
};
