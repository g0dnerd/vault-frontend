import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as DraftActions from '../actions/draft.actions';
import { DraftService } from '../../_services';

// Gets the currently ongoing draft from `draftService` and stores
// it in state on success.
// Dispatches an `initOngoingFailure` on API error response
export const initOngoingDraftsEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.initOngoingDrafts),
      mergeMap(({ tournamentId }) => {
        return draftService.getOngoingDrafts(tournamentId).pipe(
          map((ongoing) => {
            return DraftActions.initOngoingDraftsSuccess({
              ongoing,
            });
          }),
          catchError((error) => {
            return of(
              DraftActions.draftStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const initCurrentEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.initCurrentDraft),
      mergeMap(({ tournamentId }) => {
        return draftService.getCurrentDraft(tournamentId).pipe(
          map((current) => {
            return DraftActions.initCurrentDraftSuccess({ current });
          }),
          catchError((error) => {
            return of(
              DraftActions.draftStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const initSingleDraftEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.initSingleDraft),
      mergeMap(({ draftId }) => {
        return draftService.getDraftById(draftId).pipe(
          map((current) => {
            return DraftActions.initCurrentDraftSuccess({ current });
          }),
          catchError((error) => {
            return of(
              DraftActions.draftStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const seatDraftEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.seatDraft),
      mergeMap(({ draftId }) => {
        return draftService.seatDraft(draftId).pipe(
          map((current) => {
            return DraftActions.initCurrentDraftSuccess({ current });
          }),
          catchError((error) => {
            return of(
              DraftActions.draftStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
