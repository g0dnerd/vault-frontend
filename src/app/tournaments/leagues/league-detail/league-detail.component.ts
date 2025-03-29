import { NgFor } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  selectEnrollmentByQuery,
  selectEnrollmentsForTournament,
  selectTournamentById,
  State,
} from '../../../_store';
import { initializeTournaments } from '../../../_store/actions/tournaments.actions';
import { Enrollment, Tournament } from '../../../_types';
import { initializeEnrollments } from '../../../_store/actions/enrollments.actions';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  imports: [MatCardModule, PushPipe, NgFor],
  templateUrl: './league-detail.component.html',
  styleUrl: './league-detail.component.scss',
})
export class LeagueDetailComponent implements OnInit {
  leagueId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  league$: Observable<Tournament | undefined> = of(undefined);
  players$: Observable<Enrollment[]> = of([]);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeTournaments());
    this.store$.dispatch(initializeEnrollments());
    this.league$ = this.store$.select(selectTournamentById(this.leagueId()));
    this.players$ = this.store$.select(
      selectEnrollmentsForTournament(this.leagueId()),
    );
    this.enrollment$ = this.store$.select(
      selectEnrollmentByQuery(
        (enrollment: Enrollment) => enrollment?.tournamentId == this.leagueId(),
      ),
    );
  }
}
