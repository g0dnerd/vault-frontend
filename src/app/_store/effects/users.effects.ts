import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as UsersActions from '../actions/users.actions';
import { AccountsService } from '../../_services';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly accountsService = inject(AccountsService);

  initializeUsers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UsersActions.initializeAllUsers),
        mergeMap(() => {
          return this.accountsService.getAllUsers().pipe(
            map((users) => {
              return UsersActions.loadUsers({ users });
            }),
            catchError((error) => {
              return of(
                UsersActions.userStoreFailure({
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

  initializeAvailableUsersForTournament$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UsersActions.initializeAvailableUsersForTournament),
        mergeMap(({ tournamentId }) => {
          return this.accountsService
            .getAvailableForTournament(tournamentId)
            .pipe(
              map((users) => {
                return UsersActions.loadUsers({ users });
              }),
              catchError((error) => {
                return of(
                  UsersActions.userStoreFailure({
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
