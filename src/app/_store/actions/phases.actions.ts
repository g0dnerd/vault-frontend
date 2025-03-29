import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Phase } from '../../_types';

const TYPE = '[Phases/API]';

export enum PhaseActionTypes {
  PHASE_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_PHASES_FOR_TOURNAMENT = `${TYPE} Initialize phases for tournament`,
  SELECT_PHASE = `${TYPE} Select phase`,
  LOAD_PHASES = `${TYPE} Load phases`,
  SET_PHASES = `${TYPE} Set phases`,
  ADD_PHASE = `${TYPE} Add phase`,
  SET_PHASE = `${TYPE} Set phase`,
  UPSERT_PHASE = `${TYPE} Upsert phase`,
  ADD_PHASES = `${TYPE} Add phases`,
  UPSERT_PHASES = `${TYPE} Upsert phases`,
  UPDATE_PHASE = `${TYPE} Update phase`,
  UPDATE_PHASES = `${TYPE} Update phases`,
  MAP_PHASE = `${TYPE} Map phase`,
  MAP_PHASES = `${TYPE} Map phases`,
  DELETE_PHASE = `${TYPE} Delete phase`,
  DELETE_PHASES = `${TYPE} Delete phases`,
  DELETE_PHASES_BY_PREDICATE = `${TYPE} Delete phases by predicate`,
  CLEAR_PHASES = `${TYPE} Clear phases`,
}

export const phaseStoreFailure = createAction(
  PhaseActionTypes.PHASE_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializePhasesForTournament = createAction(
  PhaseActionTypes.INITIALIZE_PHASES_FOR_TOURNAMENT,
  props<{ tournamentId: number }>(),
);
export const loadPhases = createAction(
  PhaseActionTypes.LOAD_PHASES,
  props<{ phases: Phase[] }>(),
);
export const setPhases = createAction(
  PhaseActionTypes.SET_PHASES,
  props<{ phases: Phase[] }>(),
);
export const addPhase = createAction(
  PhaseActionTypes.ADD_PHASE,
  props<{ phase: Phase }>(),
);
export const setPhase = createAction(
  PhaseActionTypes.SET_PHASE,
  props<{ phase: Phase }>(),
);
export const upsertPhase = createAction(
  PhaseActionTypes.UPSERT_PHASE,
  props<{ phase: Phase }>(),
);
export const addPhases = createAction(
  PhaseActionTypes.ADD_PHASES,
  props<{ phases: Phase[] }>(),
);
export const upsertPhases = createAction(
  PhaseActionTypes.UPSERT_PHASES,
  props<{ phases: Phase[] }>(),
);
export const updatePhase = createAction(
  PhaseActionTypes.UPDATE_PHASE,
  props<{ update: Update<Phase> }>(),
);
export const updatePhases = createAction(
  PhaseActionTypes.UPDATE_PHASES,
  props<{ updates: Update<Phase>[] }>(),
);
export const mapPhase = createAction(
  PhaseActionTypes.MAP_PHASE,
  props<{ entityMap: EntityMapOne<Phase> }>(),
);
export const mapPhases = createAction(
  PhaseActionTypes.MAP_PHASES,
  props<{ entityMap: EntityMap<Phase> }>(),
);
export const deletePhase = createAction(
  PhaseActionTypes.DELETE_PHASE,
  props<{ id: number }>(),
);
export const deletePhases = createAction(
  PhaseActionTypes.DELETE_PHASES,
  props<{ ids: number[] }>(),
);
export const deletePhasesByPredicate = createAction(
  PhaseActionTypes.DELETE_PHASES_BY_PREDICATE,
  props<{ predicate: Predicate<Phase> }>(),
);
export const clearPhases = createAction(PhaseActionTypes.CLEAR_PHASES);
