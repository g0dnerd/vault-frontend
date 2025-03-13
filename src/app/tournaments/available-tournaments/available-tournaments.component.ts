import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Enrollment } from '../../_types';
import { EnrollPanelComponent } from './enroll-panel.component';
import { selectAvailableTournaments, State } from '../../_store';
import {
  initializePublicTournaments,
  initializeAvailableTournaments,
  enroll,
} from '../../_store/actions/tournament.actions';

@Component({
  standalone: true,
  imports: [EnrollPanelComponent, NgFor, NgIf, PushPipe],
  templateUrl: './available-tournaments.component.html',
  styleUrl: './available-tournaments.component.scss',
})
export class AvailableTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  readonly availableTournaments$ = this.store$.select(
    selectAvailableTournaments,
  );

  ngOnInit() {
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAvailableTournaments());
  }

  // Handler for the event emitter in `EnrollPanelComponent`,
  // dispatches registration to `store$`
  enrollInTournament(registrationData: Enrollment) {
    const { tournamentId } = registrationData;
    this.store$.dispatch(enroll({ tournamentId }));
  }
}
