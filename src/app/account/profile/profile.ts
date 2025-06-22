import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import {
  State,
  selectAdminStatus,
  selectPlayerAdminStatus,
  selectProfileData,
} from '../../_store';
import { initRoles, initProfile } from '../../_store/actions/auth.actions';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly user$ = this.store$.select(selectProfileData);
  readonly isAdmin$ = this.store$.select(selectAdminStatus);
  readonly isPlayerAdmin$ = this.store$.select(selectPlayerAdminStatus);

  ngOnInit() {
    this.store$.dispatch(initProfile());
    this.store$.dispatch(initRoles());
  }
}
