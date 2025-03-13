import { createReducer, on } from '@ngrx/store';

import { Scorecard } from '../../_types';
import * as StandingsActions from '../actions/standings.actions';

export interface StandingsState {
  tournamentStandings: Scorecard[];
  draftStandings: Scorecard[];
  errorMessage: string | null;
}

export const initialState: StandingsState = {
  tournamentStandings: [],
  draftStandings: [],
  errorMessage: null,
};

export const standingsReducer = createReducer(
  initialState,
  on(StandingsActions.standingsStoreFailure, (_state, { errorMessage }) => ({
    tournamentStandings: [],
    draftStandings: [],
    errorMessage,
  })),
  on(
    StandingsActions.initializeTournamentStandingsSuccess,
    (state, { tournamentStandings }) => ({
      ...state,
      tournamentStandings,
      errorMessage: null,
    }),
  ),
  on(
    StandingsActions.initializeDraftStandingsSuccess,
    (state, { draftStandings }) => ({
      ...state,
      draftStandings,
      errorMessage: null,
    }),
  ),
);
