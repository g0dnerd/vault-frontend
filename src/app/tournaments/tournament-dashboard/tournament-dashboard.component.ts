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

import {
  AuthAppState,
  selectAdminStatus,
  selectEnrollmentByQuery,
  selectOngoingDrafts,
  selectPlayerAdminStatus,
  selectTournamentById,
  State,
} from '../../_store';
import {
  initializeCurrentDraft,
  initializeOngoingDrafts,
} from '../../_store/actions/draft.actions';
import { initProfile } from '../../_store/actions/auth.actions';
import { initializeAllEnrollments } from '../../_store/actions/enrollment.actions';
import { initCurrentMatch } from '../../_store/actions/match.actions';
import { initializePoolStatus } from '../../_store/actions/player.actions';
import { initializePublicTournaments } from '../../_store/actions/tournament.actions';
import { Enrollment, Tournament } from '../../_types';
import { DraftPanelComponent } from './draft-panel/draft-panel.component';
import { TournamentStandingsComponent } from './tournament-standings/tournament-standings.component';

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

  tournament$: Observable<Tournament | undefined> = of(undefined);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);
  readonly drafts$ = this.store$.select(selectOngoingDrafts);
  readonly isAdmin$ = this.authStore$.select(selectAdminStatus);
  readonly isPlayerAdmin$ = this.authStore$.select(selectPlayerAdminStatus);

  async ngOnInit() {
    this.authStore$.dispatch(initProfile());
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAllEnrollments());

    this.isAdmin$.subscribe((admin) => {
      if (admin) {
        this.store$.dispatch(
          initializeOngoingDrafts({ tournamentId: this.tournamentId() }),
        );
      }
    });
    this.isPlayerAdmin$.subscribe((playerAdmin) => {
      if (playerAdmin) {
        this.store$.dispatch(
          initializeOngoingDrafts({ tournamentId: this.tournamentId() }),
        );
      }
    });

    this.store$.dispatch(
      initializeCurrentDraft({ tournamentId: this.tournamentId() }),
    );

    this.store$.dispatch(
      initCurrentMatch({ tournamentId: this.tournamentId() }),
    );
    this.store$.dispatch(
      initializePoolStatus({ tournamentId: this.tournamentId() }),
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
