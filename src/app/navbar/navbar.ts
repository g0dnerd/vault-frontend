import { PushPipe } from '@ngrx/component';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  State,
  selectAdminStatus,
  selectAuthStatus,
  selectPlayerAdminStatus,
} from '../_store';
import { logout } from '../_store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  imports: [PushPipe, RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly store$ = inject(Store<State>);
  readonly authState$ = this.store$.select(selectAuthStatus);
  readonly isAdmin$ = this.store$.select(selectAdminStatus);
  readonly isPlayerAdmin$ = this.store$.select(selectPlayerAdminStatus);

  logout() {
    this.store$.dispatch(logout());
  }
}
