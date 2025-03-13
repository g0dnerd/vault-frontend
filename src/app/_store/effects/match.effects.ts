import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MatchService } from '../../_services';
import * as MatchActions from '../actions/match.actions';

export const initCurrentMatchEffect = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initCurrentMatch),
      mergeMap(({ tournamentId }) => {
        return matchService.getCurrentMatch(tournamentId).pipe(
          map((current) => {
            return MatchActions.initCurrentMatchSuccess({
              current,
            });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({
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

export const initSingleMatchEffect = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initSingleMatch),
      mergeMap(({ matchId }) => {
        return matchService.getMatchById(matchId).pipe(
          map((current) => {
            return MatchActions.initCurrentMatchSuccess({
              current,
            });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({
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

export const initDraftMatchesEffect = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initDraftMatches),
      mergeMap(({ draftId }) => {
        return matchService.getOngoingMatches(draftId).pipe(
          map((ongoing) => {
            return MatchActions.initDraftMatchesSuccess({
              ongoing,
            });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({
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

export const updateCurrentMatchEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(MatchActions.updateCurrentMatch),
      mergeMap(({ changes }) => {
        return of(
          MatchActions.initCurrentMatchSuccess({
            current: changes,
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const pairRoundEffect = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.pairRound),
      mergeMap(({ draftId }) => {
        return matchService.pairRound(draftId).pipe(
          map((ongoing) => {
            return MatchActions.initDraftMatchesSuccess({ ongoing });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({
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
