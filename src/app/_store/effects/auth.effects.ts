import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AccountService, AuthService } from '../../_services';

export const refreshAuth$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.refreshAuth),
      mergeMap(() => {
        return authService.checkToken().pipe(
          map(({ token, roles }) => {
            return AuthActions.authSuccess({
              token,
              roles,
            });
          }),
          catchError(() => {
            return of(AuthActions.logout());
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);

export const authSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.authSuccess),
      tap(({ token, returnUrl }) => {
        localStorage.setItem('token', token);
        if (returnUrl) {
          router.navigate([returnUrl || '/']);
        }
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ loginData, returnUrl }) => {
        return authService.login(loginData).pipe(
          map(({ token, roles }) => {
            if (!token)
              return AuthActions.loginFailure({ errorMessage: 'JWT error' });
            return AuthActions.authSuccess({
              token,
              roles,
              returnUrl,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              error.status === HttpStatusCode.Unauthorized
                ? 'Wrong username or password'
                : 'An unexpected error occurred';

            return of(AuthActions.loginFailure({ errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);

export const socialLogin$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.socialLogin),
      mergeMap(({ loginData, returnUrl }) => {
        return authService.socialLogin(loginData).pipe(
          map(({ token, roles }) => {
            if (!token) {
              return AuthActions.socialLoginFailure({
                errorMessage: 'JWT error',
              });
            }
            return AuthActions.authSuccess({
              token,
              roles,
              returnUrl,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              error.status === HttpStatusCode.Unauthorized
                ? 'Wrong username or password'
                : 'An unexpected error occurred';

            return of(AuthActions.loginFailure({ errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        router.navigateByUrl('/account/login');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const initProfile$ = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.initProfile),
      mergeMap(() => {
        return accountService.getUserProfile().pipe(
          map((user) => {
            return AuthActions.initProfileSuccess({ user });
          }),
          catchError((error) => {
            const errorMessage = error
              ? error[0]
              : `${AuthActions.initProfile.type} Error while updating user`;
            return of(AuthActions.initProfileFailure({ errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);

export const initRoles$ = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.initRoles),
      mergeMap(() => {
        return accountService.getCurrentUserRoles().pipe(
          map((roles) => {
            return AuthActions.initRolesSuccess({ roles });
          }),
          catchError((error) => {
            const errorMessage = error
              ? error[0]
              : `${AuthActions.initRoles.type} Error while updating user`;
            return of(AuthActions.initRolesFailure({ errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);

export const updateUser$ = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.updateUser),
      mergeMap(({ user }) => {
        return accountService.updateUserProfile(user).pipe(
          map((authBlob) => {
            return AuthActions.updateUserSuccess({ user: authBlob });
          }),
          catchError((error) => {
            const errorMessage = error
              ? error[0]
              : `${AuthActions.updateUser.type} Error while updating user`;
            return of(AuthActions.updateUserFailure({ errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);

export const register$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ registerData }) => {
        return authService.register(registerData).pipe(
          map(({ token, roles }) => {
            if (!token)
              return AuthActions.registerFailure({
                errorMessage: 'JWT error ',
              });
            router.navigate(['/']);
            return AuthActions.authSuccess({ token, roles });
          }),
          catchError((error) => {
            const errorMessage = error
              ? `${AuthActions.register.type} ${error[0]}`
              : `${AuthActions.register.type} Error while registering`;
            return of(AuthActions.registerFailure({ errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);
