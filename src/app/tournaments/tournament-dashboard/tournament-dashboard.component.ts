import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, Observable, of } from 'rxjs';

import {
  selectCurrentUserRoles,
  selectEnrollmentByQuery,
  selectOngoingDrafts,
  selectSelectedTournament,
  selectTournamentsLoading,
  State,
} from '../../_store';
import {
  initializeCurrentDraft,
  initializeOngoingDrafts,
} from '../../_store/actions/drafts.actions';
import { initializeEnrollments } from '../../_store/actions/enrollments.actions';
import { initCurrentMatch } from '../../_store/actions/matches.actions';
import { initializePoolStatus } from '../../_store/actions/players.actions';
import {
  initializeTournaments,
  selectTournament,
} from '../../_store/actions/tournaments.actions';
import { Enrollment, Role } from '../../_types';
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
    MatProgressBarModule,
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

  enrollment$: Observable<Enrollment | undefined> = of(undefined);
  readonly tournament$ = this.store$.select(selectSelectedTournament);
  readonly drafts$ = this.store$.select(selectOngoingDrafts);
  readonly roles$ = this.store$.select(selectCurrentUserRoles);
  readonly userId$ = this.store$.select(selectCurrentUserRoles);
  readonly loading$ = this.store$.select(selectTournamentsLoading);

  isAdmin = false;

  async ngOnInit() {
    this.store$.dispatch(initializeTournaments());
    this.store$.dispatch(
      selectTournament({ tournamentId: this.tournamentId() }),
    );
    this.store$.dispatch(initializeEnrollments());

    this.roles$
      .pipe(
        distinctUntilChanged(),
        map((roles) => {
          if (roles.includes(Role.Admin) || roles.includes(Role.PlayerAdmin)) {
            this.isAdmin = true;
            this.store$.dispatch(
              initializeOngoingDrafts({ tournamentId: this.tournamentId() }),
            );
          } else {
            this.enrollment$ = this.store$.select(
              selectEnrollmentByQuery(
                (enrollment) => enrollment.tournamentId == this.tournamentId(),
              ),
            );
          }
        }),
      )
      .subscribe();

    this.store$.dispatch(
      initializeCurrentDraft({ tournamentId: this.tournamentId() }),
    );

    this.store$.dispatch(
      initCurrentMatch({ tournamentId: this.tournamentId() }),
    );
    this.store$.dispatch(
      initializePoolStatus({ tournamentId: this.tournamentId() }),
    );

    this.tournament$
      .pipe(map((tournament) => console.log(JSON.stringify(tournament))))
      .subscribe();
  }
}
