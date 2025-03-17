import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { EnrollmentService, TournamentService } from '../../_services';
import * as TournamentActions from '../actions/tournament.actions';

export const initAllTournamentsEffect = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService),
  ) => {
    return actions$.pipe(
      ofType(TournamentActions.initializeAllTournaments),
      mergeMap(() => {
        return tournamentService.getAllTournaments().pipe(
          map((tournaments) => {
            return TournamentActions.loadTournaments({ tournaments });
          }),
          catchError((error) => {
            return of(
              TournamentActions.tournamentStoreFailure({
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

// Gets all tournaments from the tournamentService
// and stores them in state.
export const initPublicTournamentsEffect = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService),
  ) => {
    return actions$.pipe(
      ofType(TournamentActions.initializePublicTournaments),
      mergeMap(() => {
        return tournamentService.getPublicTournaments().pipe(
          map((tournaments) => {
            return TournamentActions.loadTournaments({ tournaments });
          }),
          catchError((error) => {
            return of(
              TournamentActions.tournamentStoreFailure({
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

// Gets all available tournaments for the current user
// from the tournamentService and stores them in state.
// Dispatches an initAvailableFailure action
// on error reponse from the API.
export const initAvailable = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService),
  ) => {
    return actions$.pipe(
      ofType(TournamentActions.initializeAvailableTournaments),
      mergeMap(() => {
        return tournamentService.getAvailableTournaments().pipe(
          map((availableTournaments) => {
            const ids = availableTournaments.map((t) => t.id);
            return TournamentActions.setAvailableTournaments({ ids });
          }),
          catchError((error) => {
            return of(
              TournamentActions.tournamentStoreFailure({
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

// Gets all enrolled tournaments for the current user
// from the tournamentService and stores them in state.
export const initEnrolled = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService),
  ) => {
    return actions$.pipe(
      ofType(TournamentActions.initializeEnrolledTournaments),
      mergeMap(() => {
        return tournamentService.getEnrolledTournaments().pipe(
          map((enrolledTournaments) => {
            const ids = enrolledTournaments.map((t) => t.id);
            return TournamentActions.setEnrolledTournaments({ ids });
          }),
          catchError((error) => {
            return of(
              TournamentActions.tournamentStoreFailure({
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

// Registers the user with `userId` for the tournament
// with `tournamentId`. Returns the tournament object
// on success and a registerFailure on error response
// from the API.
export const enrollEffect = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentService),
  ) => {
    return actions$.pipe(
      ofType(TournamentActions.enroll),
      mergeMap(({ tournamentId }) => {
        return enrollmentService.enroll(tournamentId).pipe(
          map((res) => {
            // If the response did not contain a tournament,
            // the user could not be enrolled. Return an error.
            if (!res.tournament) {
              return TournamentActions.tournamentStoreFailure({
                errorMessage: 'Failed to register for tournament',
              });
            }
            return TournamentActions.initializeAvailableTournaments();
          }),
          catchError((error) => {
            return of(
              TournamentActions.tournamentStoreFailure({
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
