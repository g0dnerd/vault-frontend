import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { PhasesService } from '../../_services';
import * as PhasesActions from '../actions/phases.actions';

@Injectable()
export class PhasesEffects {
  private readonly actions$ = inject(Actions);
  private readonly phasesService = inject(PhasesService);

  initializePhasesForTournament$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PhasesActions.initializePhasesForTournament),
        mergeMap(({ tournamentId }) => {
          return this.phasesService.getPhasesForTournament(tournamentId).pipe(
            map((phases) => {
              return PhasesActions.loadPhases({ phases });
            }),
            catchError((error) => {
              return of(
                PhasesActions.phaseStoreFailure({
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
