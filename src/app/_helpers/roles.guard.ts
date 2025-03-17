import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthAppState, selectCurrentUserRoles } from '../_store';
import { Role } from '../_types';
import { map, take } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly roles$ = this.authStore$.select(selectCurrentUserRoles);

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    const requiredRoles: Role[] = route.data['requiredRoles'];

    return this.roles$.pipe(
      take(1),
      map((roles) => {
        return requiredRoles.some((r) => roles?.includes(r));
      }),
    );
  }
}
