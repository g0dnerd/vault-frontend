import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable } from 'rxjs';

import { Tournament } from '../_types';
import { selectAllTournaments, State } from '../_store';
import { initializeAllTournaments } from '../_store/actions/tournament.actions';

@Component({
  selector: 'app-admin-tournament-list',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, PushPipe, RouterLink],
  templateUrl: './admin-tournament-list.component.html',
  styleUrl: './admin-tournament-list.component.scss',
})
export class AdminTournamentListComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  readonly allTournaments$: Observable<Tournament[]> =
    this.store$.select(selectAllTournaments);

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
  }
}
