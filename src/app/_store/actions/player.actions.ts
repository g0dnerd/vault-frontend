import { createAction, props } from '@ngrx/store';

import { PoolStatus } from '../../_types';

const TYPE = '[Player/API]';

export enum PlayerActionTypes {
  PLAYER_STORE_FAILURE = `${TYPE} Error`,
  INIT_CURRENT_POOL_STATUS = `${TYPE} Initialize current pool status`,
  INIT_CURRENT_POOL_STATUS_SUCCESS = `${TYPE} Initialize current pool status success`,
}

export const playerStoreFailure = createAction(
  PlayerActionTypes.PLAYER_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initCurrentPoolStatus = createAction(
  PlayerActionTypes.INIT_CURRENT_POOL_STATUS,
  props<{ tournamentId: number }>(),
);
export const initCurrentPoolStatusSuccess = createAction(
  PlayerActionTypes.INIT_CURRENT_POOL_STATUS_SUCCESS,
  props<{ status: PoolStatus }>(),
);
