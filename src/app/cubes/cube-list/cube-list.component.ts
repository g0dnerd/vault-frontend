import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import {
  selectAllCubes,
  selectCubesLoading,
  selectCurrentUserRoles,
  State,
} from '../../_store';
import { initializeCubes } from '../../_store/actions/cubes.actions';
import { distinctUntilChanged, map } from 'rxjs';
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
    NgFor,
    NgIf,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './cube-list.component.html',
  styleUrl: './cube-list.component.scss',
})
export class CubeListComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly cubes$ = this.store$.select(selectAllCubes);
  readonly loading$ = this.store$.select(selectCubesLoading);
  private readonly roles$ = this.store$.select(selectCurrentUserRoles);

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
