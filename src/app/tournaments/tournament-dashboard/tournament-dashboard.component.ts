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
  selectCurrentUserRoles,
  selectEnrollmentByQuery,
  selectOngoingDrafts,
  selectTournamentById,
  State,
} from '../../_store';
import {
  initializeCurrentDraft,
  initializeOngoingDrafts,
} from '../../_store/actions/drafts.actions';
import { initProfile } from '../../_store/actions/auth.actions';
import { initializeEnrollments } from '../../_store/actions/enrollments.actions';
import { initCurrentMatch } from '../../_store/actions/matches.actions';
import { initializePoolStatus } from '../../_store/actions/players.actions';
import { initializeTournaments } from '../../_store/actions/tournaments.actions';
import { Enrollment, Role, Tournament } from '../../_types';
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

  tournament$: Observable<Tournament | undefined> = of(undefined);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);
  readonly drafts$ = this.store$.select(selectOngoingDrafts);
  readonly roles$ = this.store$.select(selectCurrentUserRoles);
  readonly userId$ = this.store$.select(selectCurrentUserRoles);

  isAdmin = false;

  async ngOnInit() {
    this.store$.dispatch(initProfile());
    this.store$.dispatch(initializeTournaments());
    this.store$.dispatch(initializeEnrollments());

    this.roles$.subscribe((roles) => {
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
  }
}
