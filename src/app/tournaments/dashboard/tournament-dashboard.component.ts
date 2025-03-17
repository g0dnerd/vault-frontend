import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Enrollment, Tournament } from '../../_types';
import { DraftPanelComponent } from './draft-panel/draft-panel.component';
import {
  AuthAppState,
  DraftAppState,
  MatchAppState,
  PlayerAppState,
  selectAdminStatus,
  selectEnrollmentByQuery,
  selectOngoingDrafts,
  selectPlayerAdminStatus,
  selectTournamentById,
  State,
} from '../../_store';
import {
  initCurrentDraft,
  initOngoingDrafts,
} from '../../_store/actions/draft.actions';
import { initializePublicTournaments } from '../../_store/actions/tournament.actions';
import { initializeAllEnrollments } from '../../_store/actions/enrollment.actions';
import { initCurrentMatch } from '../../_store/actions/match.actions';
import { initProfile } from '../../_store/actions/auth.actions';
import { initCurrentPoolStatus } from '../../_store/actions/player.actions';
import { TournamentStandingsComponent } from './tournament-standings.component';

@Component({
  standalone: true,
  imports: [
    DraftPanelComponent,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    NgFor,
    NgIf,
    PushPipe,
    RouterLink,
    TournamentStandingsComponent,
  ],
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
  readonly drafts$ = this.draftStore$.select(selectOngoingDrafts);
  readonly isAdmin$ = this.authStore$.select(selectAdminStatus);
  readonly isPlayerAdmin$ = this.authStore$.select(selectPlayerAdminStatus);

  async ngOnInit() {
    this.authStore$.dispatch(initProfile());
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAllEnrollments());

    this.isAdmin$.subscribe((admin) => {
      if (admin) {
        this.draftStore$.dispatch(
          initOngoingDrafts({ tournamentId: this.tournamentId() }),
        );
      }
    });
    this.isPlayerAdmin$.subscribe((playerAdmin) => {
      if (playerAdmin) {
        this.draftStore$.dispatch(
          initOngoingDrafts({ tournamentId: this.tournamentId() }),
        );
      }
    });

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
