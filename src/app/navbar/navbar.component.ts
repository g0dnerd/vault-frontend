import { NgIf } from '@angular/common';
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
  imports: [NgIf, PushPipe, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly store$ = inject(Store<State>);

  authState$ = this.store$.select(selectAuthStatus);
  isAdmin$ = this.store$.select(selectAdminStatus);
  isPlayerAdmin$ = this.store$.select(selectPlayerAdminStatus);

  logout() {
    this.store$.dispatch(logout());
  }
}
