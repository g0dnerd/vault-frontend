import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';

import { AuthAppState, selectAuthToken } from '../_store';
import { logout, refreshAuth } from '../_store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthGuard implements CanActivate {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  canActivate() {
    return this.authStore$.select(selectAuthToken).pipe(
      // Take the first value from the subscription and return it
      switchMap((authStatus) => {
        if (!!authStatus) {
          return of(true);
        }
        const token = localStorage.getItem('token');
        if (!token) {
          this.authStore$.dispatch(logout());
          return of(false);
        }
        this.authStore$.dispatch(refreshAuth());
        return of(true);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is NOT authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class UnAuthGuard implements CanActivate {
  private readonly authStore$ = inject(Store<AuthAppState>);

  canActivate() {
    return this.authStore$.select(selectAuthToken).pipe(
      // Take the first value from the subscription that is a resolved auth status
      // Return the inverse of that status
      map((authToken) => {
        return !!!authToken;
      })
    );
  }
}
