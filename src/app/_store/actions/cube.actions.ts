import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Cube } from '../../_types';

const TYPE = '[Cubes/API]';

export enum CubeActionTypes {
  CUBE_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_ALL_CUBES = `${TYPE} Initialize all cubes`,
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
  CubeActionTypes.CUBE_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializeAllCubes = createAction(
  CubeActionTypes.INITIALIZE_ALL_CUBES,
);
export const selectCube = createAction(
  CubeActionTypes.SELECT_CUBE,
  props<{ cubeId: number }>(),
);
export const loadCubes = createAction(
  CubeActionTypes.LOAD_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const setCubes = createAction(
  CubeActionTypes.SET_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const addCube = createAction(
  CubeActionTypes.ADD_CUBE,
  props<{ cube: Cube }>(),
);
export const setCube = createAction(
  CubeActionTypes.SET_CUBE,
  props<{ cube: Cube }>(),
);
export const upsertCube = createAction(
  CubeActionTypes.UPSERT_CUBE,
  props<{ cube: Cube }>(),
);
export const addCubes = createAction(
  CubeActionTypes.ADD_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const upsertCubes = createAction(
  CubeActionTypes.UPSERT_CUBES,
  props<{ cubes: Cube[] }>(),
);
export const updateCube = createAction(
  CubeActionTypes.UPDATE_CUBE,
  props<{ update: Update<Cube> }>(),
);
export const updateCubes = createAction(
  CubeActionTypes.UPDATE_CUBES,
  props<{ updates: Update<Cube>[] }>(),
);
export const mapCube = createAction(
  CubeActionTypes.MAP_CUBE,
  props<{ entityMap: EntityMapOne<Cube> }>(),
);
export const mapCubes = createAction(
  CubeActionTypes.MAP_CUBES,
  props<{ entityMap: EntityMap<Cube> }>(),
);
export const deleteCube = createAction(
  CubeActionTypes.DELETE_CUBE,
  props<{ id: number }>(),
);
export const deleteCubes = createAction(
  CubeActionTypes.DELETE_CUBES,
  props<{ ids: number[] }>(),
);
export const deleteCubesByPredicate = createAction(
  CubeActionTypes.DELETE_CUBES_BY_PREDICATE,
  props<{ predicate: Predicate<Cube> }>(),
);
export const clearCubes = createAction(CubeActionTypes.CLEAR_CUBES);
