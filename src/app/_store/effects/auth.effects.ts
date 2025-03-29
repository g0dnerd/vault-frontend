import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
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
                console.log('Login failure');
                return AuthActions.loginFailure({ errorMessage: 'JWT error' });
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

              console.log('Login failure');
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
                console.log('social login failure');
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

              console.log('dispatching socialLoginFailure');
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
          console.log('Logging out');
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
              const errorMessage = error
                ? error[0]
                : `${AuthActions.initProfile.type} Error while updating user`;
              console.log('Init profile failure:', errorMessage);
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
            map((roles) => {
              return AuthActions.initRolesSuccess({ roles });
            }),
            catchError((error) => {
              const errorMessage = error
                ? error[0]
                : `${AuthActions.initRoles.type} Error while updating user`;
              console.log('Init roles failure:', errorMessage);
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
              const errorMessage = error
                ? error[0]
                : `${AuthActions.updateUser.type} Error while updating user`;
              console.log('Update user failure:', errorMessage);
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
                console.log('register failure');
                return AuthActions.registerFailure({
                  errorMessage: 'JWT error ',
                });
              }
              this.router.navigate(['/']);
              return AuthActions.authSuccess({ token, roles });
            }),
            catchError((error) => {
              const errorMessage = error
                ? `${AuthActions.register.type} ${error[0]}`
                : `${AuthActions.register.type} Error while registering`;
              console.log('Register failure:', errorMessage);
              return of(AuthActions.registerFailure({ errorMessage }));
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );
}
