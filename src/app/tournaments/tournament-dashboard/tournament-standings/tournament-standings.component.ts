
import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { selectTournamentStandings, State } from '../../../_store';
import { initializeTournamentStandings } from '../../../_store/actions/standings.actions';

@Component({
  selector: 'app-tournament-standings',
  imports: [MatCardModule, PushPipe],
  templateUrl: './tournament-standings.component.html',
  styleUrl: './tournament-standings.component.scss',
})
export class TournamentStandingsComponent implements OnInit {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  readonly standings$ = this.store$.select(selectTournamentStandings);

  ngOnInit() {
    this.store$.dispatch(
      initializeTournamentStandings({ tournamentId: this.tournamentId() }),
    );
  }
}
