import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Tournament } from '../../_types';
import { selectEnrolledTournaments, State } from '../../_store';
import {
  initializePublicTournaments,
  initializeEnrolledTournaments,
} from '../../_store/actions/tournament.actions';

@Component({
  standalone: true,
  imports: [MatCardModule, MatListModule, NgFor, NgIf, RouterLink, PushPipe],
  templateUrl: './my-tournaments.component.html',
  styleUrl: './my-tournaments.component.scss',
})
export class MyTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  readonly enrolledTournaments$: Observable<Tournament[]> = this.store$.select(
    selectEnrolledTournaments,
  );

  ngOnInit() {
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeEnrolledTournaments());
  }
}
