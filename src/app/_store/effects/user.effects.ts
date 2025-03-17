import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserActions from '../actions/user.actions';
import { inject } from '@angular/core';
import { AccountService } from '../../_services';
import { catchError, map, mergeMap, of } from 'rxjs';

export const initializeAllUsersEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(UserActions.initializeAllUsers),
      mergeMap(() => {
        return accountService.getAllUsers().pipe(
          map((users) => {
            return UserActions.loadUsers({ users });
          }),
          catchError((error) => {
            return of(
              UserActions.userStoreFailure({
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

export const initializeAvailableUsersForTournamentEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(UserActions.initializeAvailableUsersForTournament),
      mergeMap(({ tournamentId }) => {
        return accountService.getAvailableForTournament(tournamentId).pipe(
          map((users) => {
            return UserActions.loadUsers({ users });
          }),
          catchError((error) => {
            return of(
              UserActions.userStoreFailure({
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
