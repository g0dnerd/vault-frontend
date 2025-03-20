import { NgFor } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  selectEnrollmentByQuery,
  selectLeaguePlayers,
  selectTournamentById,
  State,
} from '../../../_store';
import { initializeAllLeaguePlayers } from '../../../_store/actions/enrollment.actions';
import { initializePublicTournaments } from '../../../_store/actions/tournament.actions';
import { Enrollment, Tournament } from '../../../_types';

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
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAllLeaguePlayers());
    this.league$ = this.store$.select(selectTournamentById(this.leagueId()));
    this.players$ = this.store$.select(selectLeaguePlayers(this.leagueId()));
    this.enrollment$ = this.store$.select(
      selectEnrollmentByQuery(
        (enrollment: Enrollment) => enrollment?.tournamentId == this.leagueId(),
      ),
    );
  }
}
