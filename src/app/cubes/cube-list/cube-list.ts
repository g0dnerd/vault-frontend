import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs';

import {
  selectAllCubes,
  selectCubesLoading,
  selectCurrentUserRoles,
  State,
} from '../../_store';
import { initializeCubes } from '../../_store/actions/cubes.actions';
import { Role } from '../../_types';

@Component({
  selector: 'app-cube-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './cube-list.html',
  styleUrl: './cube-list.scss',
})
export class CubeList implements OnInit {
  private readonly store$ = inject(Store<State>);
  private readonly roles$ = this.store$.select(selectCurrentUserRoles);
  readonly cubes$ = this.store$.select(selectAllCubes);
  readonly loading$ = this.store$.select(selectCubesLoading);

  isAdmin = false;

  ngOnInit() {
    this.store$.dispatch(initializeCubes());

    this.roles$
      .pipe(
        distinctUntilChanged(),
        map((roles) => {
          if (roles.includes(Role.Admin) || roles.includes(Role.PlayerAdmin)) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        }),
      )
      .subscribe();
  }
}
