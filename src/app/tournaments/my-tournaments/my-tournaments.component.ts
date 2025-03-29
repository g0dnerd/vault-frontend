import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  selectAllEnrollments,
  selectAllTournaments,
  selectCurrentUserRoles,
  State,
} from '../../_store';
import { initializeEnrollments } from '../../_store/actions/enrollments.actions';
import { Enrollment, Role, Tournament } from '../../_types';
import { initializeTournaments } from '../../_store/actions/tournaments.actions';

@Component({
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, RouterLink, PushPipe],
  templateUrl: './my-tournaments.component.html',
  styleUrl: './my-tournaments.component.scss',
})
export class MyTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly roles$ = this.store$.select(selectCurrentUserRoles);
  enrollments$: Observable<Enrollment[]> = of([]);
  tournaments$: Observable<Tournament[]> = of([]);

  isAdmin = signal(false);

  ngOnInit() {
    this.store$.dispatch(initializeEnrollments());

    // FIXME: I don't like this, but `selectDistinctEnrollments` for admins sucks too
    this.roles$.subscribe((roles) => {
      if (roles.includes(Role.Admin) || roles.includes(Role.PlayerAdmin)) {
        this.isAdmin.set(true);
        this.store$.dispatch(initializeTournaments());
        this.tournaments$ = this.store$.select(selectAllTournaments);
      } else {
        this.isAdmin.set(false);
        this.enrollments$ = this.store$.select(selectAllEnrollments);
      }
    });
  }
}
