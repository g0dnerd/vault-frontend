import { createAction, props } from '@ngrx/store';

import { Player, PoolStatus } from '../../_types';

const TYPE = '[Players/API]';

export enum PlayersActionTypes {
  PLAYERS_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_PLAYERS = `${TYPE} Initialize players`,
  INITIALIZE_PLAYERS_SUCCESS = `${TYPE} Initialize players success`,
  INITIALIZE_POOL_STATUS = `${TYPE} Initialize current pool status`,
  INITIALIZE_POOL_STATUS_SUCCESS = `${TYPE} Initialize current pool status success`,
}

export const playerStoreFailure = createAction(
  PlayersActionTypes.PLAYERS_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializePlayers = createAction(
  PlayersActionTypes.INITIALIZE_PLAYERS,
);
export const initializePlayersSuccess = createAction(
  PlayersActionTypes.INITIALIZE_PLAYERS_SUCCESS,
  props<{ players: Player[] }>(),
);
export const initializePoolStatus = createAction(
  PlayersActionTypes.INITIALIZE_POOL_STATUS,
  props<{ tournamentId: number }>(),
);
export const initializePoolStatusSuccess = createAction(
  PlayersActionTypes.INITIALIZE_POOL_STATUS_SUCCESS,
  props<{ status: PoolStatus }>(),
);
