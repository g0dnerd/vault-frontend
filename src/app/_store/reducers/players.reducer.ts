import { createReducer, on } from '@ngrx/store';

import { Player, PoolStatus } from '../../_types';
import * as PlayersActions from '../actions/players.actions';

export interface PlayersState {
  players: Player[];
  status: PoolStatus | null;
  errorMessage: string | null;
}

export const initialState: PlayersState = {
  players: [],
  status: null,
  errorMessage: null,
};

export const playersReducer = createReducer(
  initialState,
  on(PlayersActions.playerStoreFailure, (_state, { errorMessage }) => ({
    players: [],
    status: null,
    errorMessage,
  })),
  on(PlayersActions.initializePlayersSuccess, (state, { players }) => ({
    ...state,
    players,
    errorMessage: null,
  })),
  on(PlayersActions.initializePoolStatusSuccess, (state, { status }) => ({
    ...state,
    status,
    errorMessage: null,
  })),
);
