import { NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { Enrollment, Tournament } from '../../_types';
import { DraftPanelComponent } from './draft-panel/draft-panel.component';
import {
  AuthAppState,
  DraftAppState,
  MatchAppState,
  PlayerAppState,
  selectEnrollmentByQuery,
  selectTournamentById,
  State,
} from '../../_store';
import { initCurrentDraft } from '../../_store/actions/draft.actions';
import { initializePublicTournaments } from '../../_store/actions/tournament.actions';
import { initializeAllEnrollments } from '../../_store/actions/enrollment.actions';
import { initCurrentMatch } from '../../_store/actions/match.actions';
import { initProfile } from '../../_store/actions/auth.actions';
import { initCurrentPoolStatus } from '../../_store/actions/player.actions';
import { Observable, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [DraftPanelComponent, MatCardModule, NgIf, PushPipe],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.scss',
})
export class TournamentDashboardComponent implements OnInit {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly draftStore$ = inject(Store<DraftAppState>);
  private readonly matchStore$ = inject(Store<MatchAppState>);
  private readonly playerStore$ = inject(Store<PlayerAppState>);

  tournament$: Observable<Tournament | undefined> = of(undefined);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);

  ngOnInit() {
    this.authStore$.dispatch(initProfile());
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAllEnrollments());
    this.draftStore$.dispatch(
      initCurrentDraft({ tournamentId: this.tournamentId() }),
    );
    this.matchStore$.dispatch(
      initCurrentMatch({ tournamentId: this.tournamentId() }),
    );
    this.playerStore$.dispatch(
      initCurrentPoolStatus({ tournamentId: this.tournamentId() }),
    );
    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId()),
    );
    this.enrollment$ = this.store$.select(
      selectEnrollmentByQuery(
        (enrollment: Enrollment) =>
          enrollment?.tournamentId == this.tournamentId(),
      ),
    );
  }
}
