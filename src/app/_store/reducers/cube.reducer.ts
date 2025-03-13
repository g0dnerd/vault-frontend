import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Cube } from '../../_types';
import * as CubeActions from '../actions/cube.actions';

export interface CubeState extends EntityState<Cube> {
  selectedCubeId: number | null;
}

export function selectCubeId(a: Cube): number {
  return a.id;
}

export const cubeAdapter: EntityAdapter<Cube> = createEntityAdapter<Cube>({
  selectId: selectCubeId,
  sortComparer: false,
});

export const initialState: CubeState = cubeAdapter.getInitialState({
  selectedCubeId: null,
});

export const cubeReducer = createReducer(
  initialState,
  on(CubeActions.addCube, (state, { cube }) => {
    return cubeAdapter.addOne(cube, state);
  }),
  on(CubeActions.setCube, (state, { cube }) => {
    return cubeAdapter.setOne(cube, state);
  }),
  on(CubeActions.upsertCube, (state, { cube }) => {
    return cubeAdapter.upsertOne(cube, state);
  }),
  on(CubeActions.addCubes, (state, { cubes }) => {
    return cubeAdapter.addMany(cubes, state);
  }),
  on(CubeActions.upsertCubes, (state, { cubes }) => {
    return cubeAdapter.upsertMany(cubes, state);
  }),
  on(CubeActions.updateCube, (state, { update }) => {
    return cubeAdapter.updateOne(update, state);
  }),
  on(CubeActions.updateCubes, (state, { updates }) => {
    return cubeAdapter.updateMany(updates, state);
  }),
  on(CubeActions.mapCube, (state, { entityMap }) => {
    return cubeAdapter.mapOne(entityMap, state);
  }),
  on(CubeActions.mapCubes, (state, { entityMap }) => {
    return cubeAdapter.map(entityMap, state);
  }),
  on(CubeActions.deleteCube, (state, { id }) => {
    return cubeAdapter.removeOne(id, state);
  }),
  on(CubeActions.deleteCubes, (state, { ids }) => {
    return cubeAdapter.removeMany(ids, state);
  }),
  on(CubeActions.deleteCubesByPredicate, (state, { predicate }) => {
    return cubeAdapter.removeMany(predicate, state);
  }),
  on(CubeActions.loadCubes, (state, { cubes }) => {
    return cubeAdapter.setAll(cubes, state);
  }),
  on(CubeActions.setCubes, (state, { cubes }) => {
    return cubeAdapter.setMany(cubes, state);
  }),
  on(CubeActions.clearCubes, (state) => {
    return cubeAdapter.removeAll({
      ...state,
      selectedCubeId: null,
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  cubeAdapter.getSelectors();

export const selectCubeIds = selectIds;
export const selectCubeEntities = selectEntities;
export const selectAllCubes = selectAll;
export const selectCubeTotal = selectTotal;
