import { createReducer, on } from '@ngrx/store';

import { Match } from '../../_types';
import * as MatchActions from '../actions/match.actions';

export interface MatchState {
  current: Match | null;
  ongoing: Match[];
}

export const initialState: MatchState = {
  current: null,
  ongoing: [],
};

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.matchStoreFailure, (_state, { errorMessage }) => ({
    current: null,
    errorMessage,
    ongoing: [],
  })),
  on(MatchActions.initCurrentMatchSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(MatchActions.initDraftMatchesSuccess, (state, { ongoing }) => ({
    ...state,
    ongoing,
    errorMessage: null,
  })),
  on(MatchActions.updateDraftMatch, (state, { changes }) => ({
    ...state,
    ongoing: state.ongoing.map((g) =>
      g.id === changes.id ? { ...g, ...changes } : g,
    ),
    errorMessage: null,
  })),
);
