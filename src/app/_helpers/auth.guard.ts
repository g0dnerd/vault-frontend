import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, of, take } from 'rxjs';

import { selectAuthToken, State } from '../_store';
import { logout, refreshAuth } from '../_store/actions/auth.actions';
import { AccountsService } from '../_services';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthGuard implements CanActivate {
  private readonly accountsService = inject(AccountsService);
  private readonly store$ = inject(Store<State>);
  private readonly authToken$ = this.store$.select(selectAuthToken);

  canActivate() {
    return this.authToken$.pipe(
      take(1),
      mergeMap((token) => {
        if (!token) {
          token = localStorage.getItem('token');
          if (!token) {
            this.store$.dispatch(logout());
            return of(false);
          }
        }
        return this.accountsService.getCurrentUserRoles().pipe(
          mergeMap((user) => {
            if (!user.roles) {
              this.store$.dispatch(logout());
              return of(false);
            }
            this.store$.dispatch(refreshAuth({ token, roles: user.roles }));
            return of(true);
          }),
          catchError(() => {
            this.store$.dispatch(logout());
            return of(false);
          }),
        );
      }),
    );
  }
}
