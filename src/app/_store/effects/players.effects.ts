import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { PlayersService } from '../../_services';
import * as PlayersActions from '../actions/players.actions';

@Injectable()
export class PlayersEffects {
  private readonly actions$ = inject(Actions);
  private readonly playersService = inject(PlayersService);

  initializePlayers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlayersActions.initializePlayers),
        mergeMap(() => {
          return this.playersService.get().pipe(
            map((players) => {
              return PlayersActions.initializePlayersSuccess({
                players,
              });
            }),
            catchError((error) => {
              return of(
                PlayersActions.playerStoreFailure({
                  errorMessage: error.message,
                }),
              );
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  initializePoolStatus$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlayersActions.initializePoolStatus),
        mergeMap(({ tournamentId }) => {
          return this.playersService.getPoolStatuses(tournamentId).pipe(
            map((status) => {
              return PlayersActions.initializePoolStatusSuccess({
                status,
              });
            }),
            catchError((error) => {
              return of(
                PlayersActions.playerStoreFailure({
                  errorMessage: error.message,
                }),
              );
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );
}
