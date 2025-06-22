import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable } from 'rxjs';

import { MatchesWebSocketService, MatchesService } from '../../../_services';
import { selectCurrentMatch, selectUsername, State } from '../../../_store';
import { updateCurrentMatch } from '../../../_store/actions/matches.actions';
import { Match } from '../../../_types';
import { ReportResultForm } from '../report-result-form/report-result-form';

@Component({
  selector: 'app-match-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    PushPipe,
    ReactiveFormsModule,
    ReportResultForm,
  ],
  templateUrl: './match-panel.html',
  styleUrl: './match-panel.scss',
})
export class MatchPanel {
  private readonly store$ = inject(Store<State>);
  private readonly matchWebSocketService = inject(MatchesWebSocketService);

  loading = false;
  result = signal(-1);

  currentMatch$: Observable<Match | null> =
    this.store$.select(selectCurrentMatch);
  username$: Observable<string | undefined> =
    this.store$.select(selectUsername);

  constructor(private readonly matchService: MatchesService) {
    // Listen to the WebSocket service and
    // have it update matches on the corresponding event
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe(async (game: Match) => {
        const currentMatch = await firstValueFrom(this.currentMatch$);
        if (currentMatch?.id === game.id) {
          this.store$.dispatch(updateCurrentMatch({ changes: game }));
        }
      });
    this.currentMatch$.subscribe((game) => {
      if (game) {
        const result =
          game.player1Wins > game.player2Wins
            ? 1
            : game.player2Wins > game.player1Wins
              ? 2
              : 0;
        this.result.set(result);
      }
    });
  }

  // Handles result confirmation
  onConfirm() {
    this.currentMatch$
      .pipe(
        map(async (game) => {
          if (!game) {
            return;
          }
          await firstValueFrom(this.matchService.confirmResult(game.id));
        }),
      )
      .subscribe();
  }
}
