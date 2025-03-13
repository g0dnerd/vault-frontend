import { createAction, props } from '@ngrx/store';

import { Match } from '../../_types';

const TYPE = '[Match/API]';

export enum MatchActionTypes {
  MATCH_STORE_FAILURE = `${TYPE} Error`,
  INIT_CURRENT_MATCH = `${TYPE} Initialize current match`,
  INIT_CURRENT_MATCH_SUCCESS = `${TYPE} Initialize current match success`,
  INIT_SINGLE_MATCH = `${TYPE} Initialize single match`,
  INIT_SINGLE_MATCH_SUCCESS = `${TYPE} Initialize single match success`,
  INIT_DRAFT_MATCHES = `${TYPE} Initialize matches for draft`,
  INIT_DRAFT_MATCHES_SUCCESS = `${TYPE} Initialize matches for draft success`,
  UPDATE_CURRENT_MATCH = `${TYPE} Update current match`,
  PAIR_ROUND = `${TYPE} Pair round`,
  UPDATE_DRAFT_MATCH = `${TYPE} Update draft match`,
}

export const matchStoreFailure = createAction(
  MatchActionTypes.MATCH_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initCurrentMatch = createAction(
  MatchActionTypes.INIT_CURRENT_MATCH,
  props<{ tournamentId: number }>(),
);
export const initCurrentMatchSuccess = createAction(
  MatchActionTypes.INIT_CURRENT_MATCH_SUCCESS,
  props<{ current: Match }>(),
);
export const initSingleMatch = createAction(
  MatchActionTypes.INIT_SINGLE_MATCH,
  props<{ matchId: number }>(),
);
export const initDraftMatches = createAction(
  MatchActionTypes.INIT_DRAFT_MATCHES,
  props<{ draftId: number }>(),
);
export const initDraftMatchesSuccess = createAction(
  MatchActionTypes.INIT_DRAFT_MATCHES_SUCCESS,
  props<{ ongoing: Match[] }>(),
);
export const updateCurrentMatch = createAction(
  MatchActionTypes.INIT_CURRENT_MATCH,
  props<{ changes: Match }>(),
);
export const pairRound = createAction(
  MatchActionTypes.PAIR_ROUND,
  props<{ draftId: number }>(),
);
export const updateDraftMatch = createAction(
  MatchActionTypes.UPDATE_DRAFT_MATCH,
  props<{ changes: Match }>(),
);
