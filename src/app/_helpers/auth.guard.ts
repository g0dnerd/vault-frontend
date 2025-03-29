import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, of, take, tap } from 'rxjs';

import { selectAuthToken, State } from '../_store';
import { logout } from '../_store/actions/auth.actions';
import { AuthService } from '../_services';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
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
        return this.authService.checkToken().pipe(
          tap(() => {
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
