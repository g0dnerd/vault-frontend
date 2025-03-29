import { createReducer, on } from '@ngrx/store';

import { Match } from '../../_types';
import * as MatchesActions from '../actions/matches.actions';

export interface MatchesState {
  current: Match | null;
  ongoing: Match[];
}

export const initialState: MatchesState = {
  current: null,
  ongoing: [],
};

export const matchesReducer = createReducer(
  initialState,
  on(MatchesActions.matchStoreFailure, (_state, { errorMessage }) => ({
    current: null,
    errorMessage,
    ongoing: [],
  })),
  on(MatchesActions.initCurrentMatchSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(MatchesActions.initDraftMatchesSuccess, (state, { ongoing }) => ({
    ...state,
    ongoing,
    errorMessage: null,
  })),
  on(MatchesActions.updateDraftMatch, (state, { changes }) => ({
    ...state,
    ongoing: state.ongoing.map((g) =>
      g.id === changes.id ? { ...g, ...changes } : g,
    ),
    errorMessage: null,
  })),
);
