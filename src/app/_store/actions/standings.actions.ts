import { createAction, props } from '@ngrx/store';

import { Scorecard } from '../../_types';

const TYPE = '[Standings/API]';

export enum StandingsActionTypes {
  STANDINGS_STORE_FAILURE = `${TYPE} Error`,
  INIT_TOURNAMENT_STANDINGS = `${TYPE} Initialize tournament standings`,
  INIT_TOURNAMENT_STANDINGS_SUCCESS = `${TYPE} Initialize tournament standings success`,
  INIT_DRAFT_STANDINGS = `${TYPE} Initialize draft standings`,
  INIT_DRAFT_STANDINGS_SUCCESS = `${TYPE} Initialize draft standings success`,
}

export const standingsStoreFailure = createAction(
  StandingsActionTypes.STANDINGS_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializeTournamentStandings = createAction(
  StandingsActionTypes.INIT_TOURNAMENT_STANDINGS,
  props<{ tournamentId: number }>(),
);
export const initializeTournamentStandingsSuccess = createAction(
  StandingsActionTypes.INIT_TOURNAMENT_STANDINGS_SUCCESS,
  props<{ tournamentStandings: Scorecard[] }>(),
);
export const initializeDraftStandings = createAction(
  StandingsActionTypes.INIT_DRAFT_STANDINGS,
  props<{ draftId: number }>(),
);
export const initializeDraftStandingsSuccess = createAction(
  StandingsActionTypes.INIT_DRAFT_STANDINGS_SUCCESS,
  props<{ draftStandings: Scorecard[] }>(),
);
