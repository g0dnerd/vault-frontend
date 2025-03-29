import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { EnrollmentsService } from '../../_services';
import * as EnrollmentsActions from '../actions/enrollments.actions';

@Injectable()
export class EnrollmentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly enrollmentsService = inject(EnrollmentsService);

  initializeEnrollments$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EnrollmentsActions.initializeEnrollments),
        mergeMap(() => {
          return this.enrollmentsService.get().pipe(
            map((enrollments) => {
              return EnrollmentsActions.loadEnrollments({ enrollments });
            }),
            catchError((error) => {
              return of(
                EnrollmentsActions.enrollmentStoreFailure({
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
