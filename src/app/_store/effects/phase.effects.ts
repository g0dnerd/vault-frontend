import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { PhaseService } from '../../_services';
import * as PhaseActions from '../actions/phase.actions';

export const initializeAllPhasesEffect = createEffect(
  (actions$ = inject(Actions), phaseService = inject(PhaseService)) => {
    return actions$.pipe(
      ofType(PhaseActions.initializePhasesForTournament),
      mergeMap(({ tournamentId }) => {
        return phaseService.getPhasesForTournament(tournamentId).pipe(
          map((phases) => {
            return PhaseActions.loadPhases({ phases });
          }),
          catchError((error) => {
            return of(
              PhaseActions.phaseStoreFailure({
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
