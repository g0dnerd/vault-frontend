import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Tournament } from '../../_types';
import { selectAllTournaments, State } from '../../_store';
import { initializeEnrolledTournaments } from '../../_store/actions/tournament.actions';

@Component({
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, RouterLink, PushPipe],
  templateUrl: './my-tournaments.component.html',
  styleUrl: './my-tournaments.component.scss',
})
export class MyTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  readonly enrolledTournaments$: Observable<Tournament[]> =
    this.store$.select(selectAllTournaments);

  ngOnInit() {
    this.store$.dispatch(initializeEnrolledTournaments());
  }
}
