import { createReducer, on } from '@ngrx/store';

import { Draft } from '../../_types';
import * as DraftsActions from '../actions/drafts.actions';

export interface DraftsState {
  ongoing: Draft[];
  current: Draft | null;
  errorMessage: string | null;
}

export const initialState: DraftsState = {
  ongoing: [],
  current: null,
  errorMessage: null,
};

export const draftsReducer = createReducer(
  initialState,
  on(DraftsActions.draftStoreFailure, (_state, { errorMessage }) => ({
    ongoing: [],
    current: null,
    errorMessage,
  })),
  on(DraftsActions.initializeCurrentDraftSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(DraftsActions.initializeOngoingDraftsSuccess, (state, { ongoing }) => ({
    ...state,
    ongoing,
    errorMessage: null,
  })),
);
