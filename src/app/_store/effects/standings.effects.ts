import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as StandingsActions from '../actions/standings.actions';
import { EnrollmentsService } from '../../_services';

@Injectable()
export class StandingsEffects {
  private readonly actions$ = inject(Actions);
  private readonly enrollmentsService = inject(EnrollmentsService);

  initializeTournamentStandings$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StandingsActions.initializeTournamentStandings),
        mergeMap(({ tournamentId }) => {
          return this.enrollmentsService
            .getTournamentStandings(tournamentId)
            .pipe(
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
    { dispatch: true },
  );
}
