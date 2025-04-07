import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AccountsService, AuthService } from '../../_services';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly accountsService = inject(AccountsService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(({ token, returnUrl }) => {
          localStorage.setItem('token', token);
          if (returnUrl) {
            this.router.navigate([returnUrl || '/']);
          }
        }),
      );
    },
    { dispatch: false },
  );

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({ loginData, returnUrl }) => {
          return this.authService.login(loginData).pipe(
            map(({ token, roles }) => {
              if (!token) {
                return AuthActions.loginFailure({ errorMessage: 'JWT error' });
              }
              return AuthActions.authSuccess({
                token,
                roles,
                returnUrl,
              });
            }),
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error.message;
              return of(AuthActions.loginFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  socialLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.socialLogin),
        mergeMap(({ loginData, returnUrl }) => {
          return this.authService.socialLogin(loginData).pipe(
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
              const errorMessage = error.error.message;
              return of(AuthActions.socialLoginFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('state');
          this.router.navigateByUrl('/account/login');
        }),
      );
    },
    { dispatch: false },
  );

  initProfile$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.initProfile),
        mergeMap(() => {
          return this.accountsService.getUserProfile().pipe(
            map((user) => {
              return AuthActions.initProfileSuccess({ user });
            }),
            catchError((error) => {
              const errorMessage = error.error.message;
              return of(AuthActions.initProfileFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  initRoles$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.initRoles),
        mergeMap(() => {
          return this.accountsService.getCurrentUserRoles().pipe(
            map((user) => {
              if (!user.roles) {
                return AuthActions.initRolesFailure({
                  errorMessage: 'Could not get user permissions.',
                });
              }
              return AuthActions.initRolesSuccess({ roles: user.roles });
            }),
            catchError((error) => {
              const errorMessage = error.error.message;
              return of(AuthActions.initRolesFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  updateUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.updateUser),
        mergeMap(({ user }) => {
          return this.accountsService.updateUserProfile(user).pipe(
            map((authBlob) => {
              return AuthActions.updateUserSuccess({ user: authBlob });
            }),
            catchError((error) => {
              const errorMessage = error.error.message;
              return of(AuthActions.updateUserFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  register$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap(({ registerData }) => {
          return this.authService.register(registerData).pipe(
            map(({ token, roles }) => {
              if (!token) {
                return AuthActions.registerFailure({
                  errorMessage: 'JWT error ',
                });
              }
              this.router.navigate(['/']);
              return AuthActions.authSuccess({ token, roles });
            }),
            catchError((error) => {
              const errorMessage = error.error.message;
              return of(AuthActions.registerFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );
}
