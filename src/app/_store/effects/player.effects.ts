import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { PlayerService } from '../../_services';
import * as PlayerActions from '../actions/player.actions';

export const initCurrentPoolStatusEffect = createEffect(
  (actions$ = inject(Actions), playerService = inject(PlayerService)) => {
    return actions$.pipe(
      ofType(PlayerActions.initCurrentPoolStatus),
      mergeMap(({ tournamentId }) => {
        return playerService.getPoolStatuses(tournamentId).pipe(
          map((status) => {
            return PlayerActions.initCurrentPoolStatusSuccess({
              status,
            });
          }),
          catchError((error) => {
            return of(
              PlayerActions.playerStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
