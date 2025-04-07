import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { EnrollmentsService, TournamentsService } from '../../_services';
import * as TournamentsActions from '../actions/tournaments.actions';

@Injectable()
export class TournamentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly enrollmentsService = inject(EnrollmentsService);
  private readonly tournamentsService = inject(TournamentsService);

  initializeTournaments$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TournamentsActions.initializeTournaments),
        mergeMap(() => {
          return this.tournamentsService.getAllTournaments().pipe(
            map((tournaments) => {
              return TournamentsActions.loadTournaments({ tournaments });
            }),
            catchError((error) => {
              return of(
                TournamentsActions.tournamentStoreFailure({
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

  // Gets all available tournaments for the current user
  // from the tournamentService and stores them in state.
  // Dispatches an initAvailableFailure action
  // on error reponse from the API.
  initializeAvailableTournaments$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TournamentsActions.initializeAvailableTournaments),
        mergeMap(() => {
          return this.tournamentsService.getAvailableTournaments().pipe(
            map((availableTournaments) => {
              const availableIds = availableTournaments.map((t) => t.id);
              return TournamentsActions.setAvailableTournaments({
                availableIds,
              });
            }),
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error.message;
              return of(
                TournamentsActions.tournamentStoreFailure({
                  errorMessage,
                }),
              );
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  initializeEnrolledTournaments$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TournamentsActions.initializeEnrolledTournaments),
        mergeMap(() => {
          return this.tournamentsService.getEnrolledTournaments().pipe(
            map((enrolledTournaments) => {
              const enrolledIds = enrolledTournaments.map((t) => t.id);
              return TournamentsActions.setEnrolledTournaments({ enrolledIds });
            }),
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error.message;
              return of(
                TournamentsActions.tournamentStoreFailure({
                  errorMessage,
                }),
              );
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );

  // Registers the user with `userId` for the tournament
  // with `tournamentId`. Returns the tournament object
  // on success and a registerFailure on error response
  // from the API.
  enroll$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TournamentsActions.enroll),
        mergeMap(({ tournamentId }) => {
          return this.enrollmentsService.enroll(tournamentId).pipe(
            map(() => {
              return TournamentsActions.initializeAvailableTournaments();
            }),
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error.message;
              return of(
                TournamentsActions.tournamentStoreFailure({
                  errorMessage,
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
