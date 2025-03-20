import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';

import { AuthAppState, selectAuthStatus } from '../_store';
import { logout, refreshAuth } from '../_store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthGuard implements CanActivate {
  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly authStatus$ = this.authStore$.select(selectAuthStatus);

  canActivate() {
    return this.authStatus$.pipe(
      take(1),
      map((isAuthenticated) => {
        // If we have an authentication status in state, we can return it
        if (isAuthenticated) {
          return isAuthenticated;
        }

        // If we don't, we can check for a token in local storage
        const token = localStorage.getItem('token');
        if (!token) {
          // If we don't find one, we dispatch a logout action and deny the routing request.
          this.authStore$.dispatch(logout());
          return false;
        }

        // If we did find one, we check the token's status with the backend
        // before adjudicating the routing request.
        this.authStore$.dispatch(refreshAuth());
        return true;
      }),
    );
  }
}
