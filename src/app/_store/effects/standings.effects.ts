import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as StandingsActions from '../actions/standings.actions';
import { EnrollmentService } from '../../_services';

export const initializeTournamentStandings$ = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentService),
  ) => {
    return actions$.pipe(
      ofType(StandingsActions.initializeTournamentStandings),
      mergeMap(({ tournamentId }) => {
        return enrollmentService.getTournamentStandings(tournamentId).pipe(
          map((tournamentStandings) => {
            return StandingsActions.initializeTournamentStandingsSuccess({
              tournamentStandings,
            });
          }),
          catchError((error) => {
            return of(
              StandingsActions.standingsStoreFailure({
                errorMessage: error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);
