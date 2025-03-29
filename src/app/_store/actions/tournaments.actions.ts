import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Tournament } from '../../_types';

const TYPE = '[Tournaments/API]';

export enum TournamentsActionTypes {
  TOURNAMENT_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_TOURNAMENTS = `${TYPE} Initialize tournaments`,
  INITIALIZE_AVAILABLE_TOURNAMENTS = `${TYPE} Initialize available tournaments`,
  SET_AVAILABLE_TOURNAMENTS = `${TYPE} Set available tournaments`,
  SELECT_TOURNAMENT = `${TYPE} Select tournament`,
  LOAD_TOURNAMENTS = `${TYPE} Load tournaments`,
  SET_TOURNAMENTS = `${TYPE} Set tournaments`,
  ADD_TOURNAMENT = `${TYPE} Add tournament`,
  SET_TOURNAMENT = `${TYPE} Set tournament`,
  UPSERT_TOURNAMENT = `${TYPE} Upsert tournament`,
  ADD_TOURNAMENTS = `${TYPE} Add tournaments`,
  UPSERT_TOURNAMENTS = `${TYPE} Upsert tournaments`,
  UPDATE_TOURNAMENT = `${TYPE} Update tournament`,
  UPDATE_TOURNAMENTS = `${TYPE} Update tournaments`,
  MAP_TOURNAMENT = `${TYPE} Map tournament`,
  MAP_TOURNAMENTS = `${TYPE} Map tournaments`,
  DELETE_TOURNAMENT = `${TYPE} Delete tournament`,
  DELETE_TOURNAMENTS = `${TYPE} Delete tournaments`,
  DELETE_TOURNAMENTS_BY_PREDICATE = `${TYPE} Delete tournaments by predicate`,
  CLEAR_TOURNAMENTS = `${TYPE} Clear tournaments`,
  ENROLL = `${TYPE} Enroll in tournament`,
}

export const tournamentStoreFailure = createAction(
  TournamentsActionTypes.TOURNAMENT_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const setAvailableTournaments = createAction(
  TournamentsActionTypes.SET_AVAILABLE_TOURNAMENTS,
  props<{ ids: number[] }>(),
);
export const initializeAllTournaments = createAction(
  TournamentsActionTypes.INITIALIZE_TOURNAMENTS,
);
export const initializeAvailableTournaments = createAction(
  TournamentsActionTypes.INITIALIZE_AVAILABLE_TOURNAMENTS,
);
export const selectTournament = createAction(
  TournamentsActionTypes.SELECT_TOURNAMENT,
  props<{ tournamentId: number }>(),
);
export const loadTournaments = createAction(
  TournamentsActionTypes.LOAD_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const setTournaments = createAction(
  TournamentsActionTypes.SET_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const addTournament = createAction(
  TournamentsActionTypes.ADD_TOURNAMENT,
  props<{ tournament: Tournament }>(),
);
export const setTournament = createAction(
  TournamentsActionTypes.SET_TOURNAMENT,
  props<{ tournament: Tournament }>(),
);
export const upsertTournament = createAction(
  TournamentsActionTypes.UPSERT_TOURNAMENT,
  props<{ tournament: Tournament }>(),
);
export const addTournaments = createAction(
  TournamentsActionTypes.ADD_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const upsertTournaments = createAction(
  TournamentsActionTypes.UPSERT_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const updateTournament = createAction(
  TournamentsActionTypes.UPDATE_TOURNAMENT,
  props<{ update: Update<Tournament> }>(),
);
export const updateTournaments = createAction(
  TournamentsActionTypes.UPDATE_TOURNAMENTS,
  props<{ updates: Update<Tournament>[] }>(),
);
export const mapTournament = createAction(
  TournamentsActionTypes.MAP_TOURNAMENT,
  props<{ entityMap: EntityMapOne<Tournament> }>(),
);
export const mapTournaments = createAction(
  TournamentsActionTypes.MAP_TOURNAMENTS,
  props<{ entityMap: EntityMap<Tournament> }>(),
);
export const deleteTournament = createAction(
  TournamentsActionTypes.DELETE_TOURNAMENT,
  props<{ id: number }>(),
);
export const deleteTournaments = createAction(
  TournamentsActionTypes.DELETE_TOURNAMENTS,
  props<{ ids: number[] }>(),
);
export const deleteTournamentsByPredicate = createAction(
  TournamentsActionTypes.DELETE_TOURNAMENTS_BY_PREDICATE,
  props<{ predicate: Predicate<Tournament> }>(),
);
export const clearTournaments = createAction(
  TournamentsActionTypes.CLEAR_TOURNAMENTS,
);
export const enroll = createAction(
  TournamentsActionTypes.ENROLL,
  props<{ tournamentId: number }>(),
);
