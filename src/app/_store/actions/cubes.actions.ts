import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Cube } from '../../_types';

const TYPE = '[Cubes/API]';

export enum CubesActionTypes {
  CUBE_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_CUBES = `${TYPE} Initialize all cubes`,
  SELECT_CUBE = `${TYPE} Select cube`,
  LOAD_CUBES = `${TYPE} Load cubes`,
  SET_CUBES = `${TYPE} Set cubes`,
  ADD_CUBE = `${TYPE} Add cube`,
  SET_CUBE = `${TYPE} Set cube`,
  UPSERT_CUBE = `${TYPE} Upsert cube`,
  ADD_CUBES = `${TYPE} Add cubes`,
  UPSERT_CUBES = `${TYPE} Upsert cubes`,
  UPDATE_CUBE = `${TYPE} Update cube`,
  UPDATE_CUBES = `${TYPE} Update cubes`,
  MAP_CUBE = `${TYPE} Map cube`,
  MAP_CUBES = `${TYPE} Map cubes`,
  DELETE_CUBE = `${TYPE} Delete cube`,
  DELETE_CUBES = `${TYPE} Delete cubes`,
  DELETE_CUBES_BY_PREDICATE = `${TYPE} Delete cubes by predicate`,
  CLEAR_CUBES = `${TYPE} Clear cubes`,
}

export const cubeStoreFailure = createAction(
  CubesActionTypes.CUBE_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializeCubes = createAction(CubesActionTypes.INITIALIZE_CUBES);
export const selectCube = createAction(
  CubesActionTypes.SELECT_CUBE,
  props<{ cubeId: number }>(),
);
export const loadCubes = createAction(
  CubesActionTypes.LOAD_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const setCubes = createAction(
  CubesActionTypes.SET_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const addCube = createAction(
  CubesActionTypes.ADD_CUBE,
  props<{ cube: Cube }>(),
);
export const setCube = createAction(
  CubesActionTypes.SET_CUBE,
  props<{ cube: Cube }>(),
);
export const upsertCube = createAction(
  CubesActionTypes.UPSERT_CUBE,
  props<{ cube: Cube }>(),
);
export const addCubes = createAction(
  CubesActionTypes.ADD_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const upsertCubes = createAction(
  CubesActionTypes.UPSERT_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const updateCube = createAction(
  CubesActionTypes.UPDATE_CUBE,
  props<{ update: Update<Cube> }>(),
);
export const updateCubes = createAction(
  CubesActionTypes.UPDATE_CUBES,
  props<{ updates: Update<Cube>[] }>(),
);
export const mapCube = createAction(
  CubesActionTypes.MAP_CUBE,
  props<{ entityMap: EntityMapOne<Cube> }>(),
);
export const mapCubes = createAction(
  CubesActionTypes.MAP_CUBES,
  props<{ entityMap: EntityMap<Cube> }>(),
);
export const deleteCube = createAction(
  CubesActionTypes.DELETE_CUBE,
  props<{ id: number }>(),
);
export const deleteCubes = createAction(
  CubesActionTypes.DELETE_CUBES,
  props<{ ids: number[] }>(),
);
export const deleteCubesByPredicate = createAction(
  CubesActionTypes.DELETE_CUBES_BY_PREDICATE,
  props<{ predicate: Predicate<Cube> }>(),
);
export const clearCubes = createAction(CubesActionTypes.CLEAR_CUBES);
