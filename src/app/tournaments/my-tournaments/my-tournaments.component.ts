import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { selectEnrolledTournaments, State } from '../../_store';
import {
  initializeEnrolledTournaments,
  initializeTournaments,
} from '../../_store/actions/tournaments.actions';

@Component({
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, RouterLink, PushPipe],
  templateUrl: './my-tournaments.component.html',
  styleUrl: './my-tournaments.component.scss',
})
export class MyTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly tournaments$ = this.store$.select(selectEnrolledTournaments);

  ngOnInit() {
    this.store$.dispatch(initializeTournaments());
    this.store$.dispatch(initializeEnrolledTournaments());
  }
}
