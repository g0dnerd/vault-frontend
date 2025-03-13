import { createReducer, on } from '@ngrx/store';

import { Draft } from '../../_types';
import * as DraftActions from '../actions/draft.actions';

export interface DraftState {
  ongoing: Draft[];
  current: Draft | null;
  errorMessage: string | null;
}

export const initialState: DraftState = {
  ongoing: [],
  current: null,
  errorMessage: null,
};

export const draftReducer = createReducer(
  initialState,
  on(DraftActions.draftStoreFailure, (_state, { errorMessage }) => ({
    ongoing: [],
    current: null,
    errorMessage,
  })),
  on(DraftActions.initCurrentDraftSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(DraftActions.initOngoingDraftsSuccess, (state, { ongoing }) => ({
    ...state,
    ongoing,
    errorMessage: null,
  })),
);
