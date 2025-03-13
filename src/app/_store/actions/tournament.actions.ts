import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Tournament } from '../../_types';

const TYPE = '[Tournaments/API]';

export enum TournamentActionTypes {
  TOURNAMENT_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_ALL_TOURNAMENTS = `${TYPE} Initialize all tournaments`,
  INITIALIZE_PUBLIC_TOURNAMENTS = `${TYPE} Initialize all public tournaments`,
  INITIALIZE_AVAILABLE_TOURNAMENTS = `${TYPE} Initialize available tournaments`,
  INITIALIZE_ENROLLED_TOURNAMENTS = `${TYPE} Initialize enrolled tournaments`,
  SET_AVAILABLE_TOURNAMENTS = `${TYPE} Set available tournaments`,
  SET_ENROLLED_TOURNAMENTS = `${TYPE} Set enrolled tournaments`,
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
  TournamentActionTypes.TOURNAMENT_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const setAvailableTournaments = createAction(
  TournamentActionTypes.SET_AVAILABLE_TOURNAMENTS,
  props<{ ids: number[] }>(),
);
export const setEnrolledTournaments = createAction(
  TournamentActionTypes.SET_ENROLLED_TOURNAMENTS,
  props<{ ids: number[] }>(),
);
export const initializeAllTournaments = createAction(
  TournamentActionTypes.INITIALIZE_ALL_TOURNAMENTS,
);
export const initializePublicTournaments = createAction(
  TournamentActionTypes.INITIALIZE_PUBLIC_TOURNAMENTS,
);
export const initializeAvailableTournaments = createAction(
  TournamentActionTypes.INITIALIZE_AVAILABLE_TOURNAMENTS,
);
export const initializeEnrolledTournaments = createAction(
  TournamentActionTypes.INITIALIZE_ENROLLED_TOURNAMENTS,
);
export const selectTournament = createAction(
  TournamentActionTypes.SELECT_TOURNAMENT,
  props<{ tournamentId: number }>(),
);
export const loadTournaments = createAction(
  TournamentActionTypes.LOAD_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const setTournaments = createAction(
  TournamentActionTypes.SET_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const addTournament = createAction(
  TournamentActionTypes.ADD_TOURNAMENT,
  props<{ tournament: Tournament }>(),
);
export const setTournament = createAction(
  TournamentActionTypes.SET_TOURNAMENT,
  props<{ tournament: Tournament }>(),
);
export const upsertTournament = createAction(
  TournamentActionTypes.UPSERT_TOURNAMENT,
  props<{ tournament: Tournament }>(),
);
export const addTournaments = createAction(
  TournamentActionTypes.ADD_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const upsertTournaments = createAction(
  TournamentActionTypes.UPSERT_TOURNAMENTS,
  props<{ tournaments: Tournament[] }>(),
);
export const updateTournament = createAction(
  TournamentActionTypes.UPDATE_TOURNAMENT,
  props<{ update: Update<Tournament> }>(),
);
export const updateTournaments = createAction(
  TournamentActionTypes.UPDATE_TOURNAMENTS,
  props<{ updates: Update<Tournament>[] }>(),
);
export const mapTournament = createAction(
  TournamentActionTypes.MAP_TOURNAMENT,
  props<{ entityMap: EntityMapOne<Tournament> }>(),
);
export const mapTournaments = createAction(
  TournamentActionTypes.MAP_TOURNAMENTS,
  props<{ entityMap: EntityMap<Tournament> }>(),
);
export const deleteTournament = createAction(
  TournamentActionTypes.DELETE_TOURNAMENT,
  props<{ id: number }>(),
);
export const deleteTournaments = createAction(
  TournamentActionTypes.DELETE_TOURNAMENTS,
  props<{ ids: number[] }>(),
);
export const deleteTournamentsByPredicate = createAction(
  TournamentActionTypes.DELETE_TOURNAMENTS_BY_PREDICATE,
  props<{ predicate: Predicate<Tournament> }>(),
);
export const clearTournaments = createAction(
  TournamentActionTypes.CLEAR_TOURNAMENTS,
);
export const enroll = createAction(
  TournamentActionTypes.ENROLL,
  props<{ tournamentId: number }>(),
);
