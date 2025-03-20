import { createReducer, on } from '@ngrx/store';

import { PoolStatus } from '../../_types';
import * as PlayerActions from '../actions/player.actions';

export interface PlayerState {
  status: PoolStatus | null;
}

export const initialState: PlayerState = {
  status: null,
};

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.playerStoreFailure, (_state, { errorMessage }) => ({
    status: null,
    errorMessage,
  })),
  on(PlayerActions.initializePoolStatusSuccess, (_state, { status }) => ({
    status,
    errorMessage: null,
  })),
);
