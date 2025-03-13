import { NgFor } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Draft, Tournament } from '../../_types';
import {
  DraftAppState,
  selectOngoingDrafts,
  selectTournamentById,
  State,
} from '../../_store';
import { initOngoingDrafts } from '../../_store/actions/draft.actions';
import { initializeAllTournaments } from '../../_store/actions/tournament.actions';

@Component({
  selector: 'app-admin-tournament-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    NgFor,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './admin-tournament-dashboard.component.html',
  styleUrl: './admin-tournament-dashboard.component.scss',
})
export class AdminTournamentDashboardComponent implements OnInit {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  private readonly draftStore$ = inject(Store<DraftAppState>);

  drafts$: Observable<Draft[]> = of([]);
  tournament$: Observable<Tournament | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId()),
    );
    this.draftStore$.dispatch(
      initOngoingDrafts({ tournamentId: this.tournamentId() }),
    );
    this.drafts$ = this.draftStore$.select(selectOngoingDrafts);
  }
}
