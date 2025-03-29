import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MatchesService } from '../../_services';
import * as MatchesActions from '../actions/matches.actions';

@Injectable()
export class MatchesEffects {
  private readonly actions$ = inject(Actions);
  private readonly matchesService = inject(MatchesService);

  initCurrentMatch$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MatchesActions.initCurrentMatch),
        mergeMap(({ tournamentId }) => {
          return this.matchesService.getCurrentMatch(tournamentId).pipe(
            map((current) => {
              return MatchesActions.initCurrentMatchSuccess({
                current,
              });
            }),
            catchError((error) => {
              return of(
                MatchesActions.matchStoreFailure({
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

  initializeSingleMatch$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MatchesActions.initSingleMatch),
        mergeMap(({ matchId }) => {
          return this.matchesService.getMatchById(matchId).pipe(
            map((current) => {
              return MatchesActions.initCurrentMatchSuccess({
                current,
              });
            }),
            catchError((error) => {
              return of(
                MatchesActions.matchStoreFailure({
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

  initializeDraftMatches$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MatchesActions.initDraftMatches),
        mergeMap(({ draftId }) => {
          return this.matchesService.getOngoingMatches(draftId).pipe(
            map((ongoing) => {
              return MatchesActions.initDraftMatchesSuccess({
                ongoing,
              });
            }),
            catchError((error) => {
              return of(
                MatchesActions.matchStoreFailure({
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

  updateCurrentMatch$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MatchesActions.updateCurrentMatch),
        mergeMap(({ changes }) => {
          return of(
            MatchesActions.initCurrentMatchSuccess({
              current: changes,
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  pairRound$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MatchesActions.pairRound),
        mergeMap(({ draftId }) => {
          return this.matchesService.pairRound(draftId).pipe(
            map((ongoing) => {
              return MatchesActions.initDraftMatchesSuccess({ ongoing });
            }),
            catchError((error) => {
              return of(
                MatchesActions.matchStoreFailure({
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
