import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { EnrollmentService } from '../../_services';
import * as EnrollmentActions from '../actions/enrollment.actions';

export const initializeAllEnrollments$ = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentService),
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.initializeAllEnrollments),
      mergeMap(() => {
        return enrollmentService.getForUser().pipe(
          map((enrollments) => {
            return EnrollmentActions.loadEnrollments({ enrollments });
          }),
          catchError((error) => {
            return of(
              EnrollmentActions.enrollmentStoreFailure({
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

export const initializeEnrollmentsForTournament$ = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentService),
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.initializeEnrollmentsForTournament),
      mergeMap(({ tournamentId }) => {
        return enrollmentService.getForTournament(tournamentId).pipe(
          map((enrollments) => {
            return EnrollmentActions.loadEnrollments({ enrollments });
          }),
          catchError((error) => {
            return of(
              EnrollmentActions.enrollmentStoreFailure({
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

export const initializeLeaguePlayers$ = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentService),
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.initializeAllLeaguePlayers),
      mergeMap(() => {
        return enrollmentService.getForLeague().pipe(
          map((enrollments) => {
            return EnrollmentActions.loadEnrollments({ enrollments });
          }),
          catchError((error) => {
            return of(
              EnrollmentActions.enrollmentStoreFailure({
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

export const initializeEnrollmentsForDraft$ = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentService),
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.initializeEnrollmentsForDraft),
      mergeMap(({ draftId }) => {
        return enrollmentService.getEnrollmentsForDraft(draftId).pipe(
          map((enrollments) => {
            const ids = enrollments.map((e) => e.id);
            return EnrollmentActions.setEnrollmentsForDraft({
              ids,
            });
          }),
          catchError((error) => {
            return of(
              EnrollmentActions.enrollmentStoreFailure({
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
