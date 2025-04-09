import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import {
  initializeAvailableTournaments,
  enroll,
  initializeTournaments,
} from '../../_store/actions/tournaments.actions';
import {
  selectAvailableTournaments,
  selectTournamentsLoading,
  State,
} from '../../_store';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    NgFor,
    NgIf,
    PushPipe,
  ],
  templateUrl: './available-tournaments.component.html',
  styleUrl: './available-tournaments.component.scss',
})
export class AvailableTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly availableTournaments$ = this.store$.select(
    selectAvailableTournaments,
  );
  readonly loading$ = this.store$.select(selectTournamentsLoading);

  loading = false;

  ngOnInit() {
    this.store$.dispatch(initializeTournaments());
    this.store$.dispatch(initializeAvailableTournaments());
  }

  onSubmit(tournamentId: number) {
    this.loading = true;
    this.store$.dispatch(enroll({ tournamentId }));
    this.loading = false;
  }
}
