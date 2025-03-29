import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as DraftsActions from '../actions/drafts.actions';
import { DraftsService } from '../../_services';

@Injectable()
export class DraftsEffects {
  private readonly actions$ = inject(Actions);
  private readonly draftsService = inject(DraftsService);

  // Gets the currently ongoing draft from `draftService` and stores
  // it in state on success.
  // Dispatches an `initOngoingFailure` on API error response
  initializeOngoingDrafts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DraftsActions.initializeOngoingDrafts),
        mergeMap(({ tournamentId }) => {
          return this.draftsService.getOngoingDrafts(tournamentId).pipe(
            map((ongoing) => {
              return DraftsActions.initializeOngoingDraftsSuccess({
                ongoing,
              });
            }),
            catchError((error) => {
              return of(
                DraftsActions.draftStoreFailure({
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

  initializeCurrentDraft$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DraftsActions.initializeCurrentDraft),
        mergeMap(({ tournamentId }) => {
          return this.draftsService.getCurrentDraft(tournamentId).pipe(
            map((current) => {
              return DraftsActions.initializeCurrentDraftSuccess({ current });
            }),
            catchError((error) => {
              return of(
                DraftsActions.draftStoreFailure({
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

  initializeSingleDraft$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DraftsActions.initializeSingleDraft),
        mergeMap(({ draftId }) => {
          return this.draftsService.getDraftById(draftId).pipe(
            map((current) => {
              return DraftsActions.initializeCurrentDraftSuccess({ current });
            }),
            catchError((error) => {
              return of(
                DraftsActions.draftStoreFailure({
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

  seatDraft$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DraftsActions.seatDraft),
        mergeMap(({ draftId }) => {
          return this.draftsService.seatDraft(draftId).pipe(
            map((current) => {
              return DraftsActions.initializeCurrentDraftSuccess({ current });
            }),
            catchError((error) => {
              return of(
                DraftsActions.draftStoreFailure({
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

  createDraft$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DraftsActions.createDraft),
        mergeMap(({ data }) => {
          return this.draftsService.createDraft(data).pipe(
            map((current) => {
              return DraftsActions.initializeCurrentDraftSuccess({ current });
            }),
            catchError((error) => {
              return of(
                DraftsActions.draftStoreFailure({
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

  updateDraft$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DraftsActions.updateDraft),
        mergeMap(({ changes }) => {
          return this.draftsService.editDraft(changes).pipe(
            map((current) => {
              return DraftsActions.initializeCurrentDraftSuccess({ current });
            }),
            catchError((error) => {
              return of(
                DraftsActions.draftStoreFailure({
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
