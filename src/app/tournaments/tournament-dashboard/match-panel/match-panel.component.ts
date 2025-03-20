import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { MatchWebSocketService, MatchService } from '../../../_services';
import {
  AuthAppState,
  selectCurrentMatch,
  selectUsername,
  State,
} from '../../../_store';
import { updateCurrentMatch } from '../../../_store/actions/match.actions';
import { Match } from '../../../_types';
import { ReportResultFormComponent } from '../report-result-form/report-result-form.component';

@Component({
  selector: 'app-match-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    NgIf,
    PushPipe,
    ReactiveFormsModule,
    ReportResultFormComponent,
  ],
  templateUrl: './match-panel.component.html',
  styleUrl: './match-panel.component.scss',
})
export class MatchPanelComponent {
  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly store$ = inject(Store<State>);
  private readonly matchWebSocketService = inject(MatchWebSocketService);

  loading = false;
  result = signal(-1);

  currentMatch$: Observable<Match | null> =
    this.store$.select(selectCurrentMatch);
  username$: Observable<string | undefined> =
    this.authStore$.select(selectUsername);

  constructor(private readonly matchService: MatchService) {
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
  // FIXME: subscribe to things like a normal person
  async onConfirm() {
    const game = await firstValueFrom(this.currentMatch$);
    if (!game) {
      // FIXME: Error handling
      return;
    }
    await firstValueFrom(this.matchService.confirmResult(game.id));
  }
}
