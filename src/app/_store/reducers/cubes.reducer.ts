import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Cube } from '../../_types';
import * as CubesActions from '../actions/cubes.actions';

export interface CubesState extends EntityState<Cube> {
  selectedCubeId: number | null;
}

export function selectCubeId(a: Cube): number {
  return a.id;
}

export const cubesAdapter: EntityAdapter<Cube> = createEntityAdapter<Cube>({
  selectId: selectCubeId,
  sortComparer: false,
});

export const initialState: CubesState = cubesAdapter.getInitialState({
  selectedCubeId: null,
});

export const cubesReducer = createReducer(
  initialState,
  on(CubesActions.addCube, (state, { cube }) => {
    return cubesAdapter.addOne(cube, state);
  }),
  on(CubesActions.setCube, (state, { cube }) => {
    return cubesAdapter.setOne(cube, state);
  }),
  on(CubesActions.upsertCube, (state, { cube }) => {
    return cubesAdapter.upsertOne(cube, state);
  }),
  on(CubesActions.addCubes, (state, { cubes }) => {
    return cubesAdapter.addMany(cubes, state);
  }),
  on(CubesActions.upsertCubes, (state, { cubes }) => {
    return cubesAdapter.upsertMany(cubes, state);
  }),
  on(CubesActions.updateCube, (state, { update }) => {
    return cubesAdapter.updateOne(update, state);
  }),
  on(CubesActions.updateCubes, (state, { updates }) => {
    return cubesAdapter.updateMany(updates, state);
  }),
  on(CubesActions.mapCube, (state, { entityMap }) => {
    return cubesAdapter.mapOne(entityMap, state);
  }),
  on(CubesActions.mapCubes, (state, { entityMap }) => {
    return cubesAdapter.map(entityMap, state);
  }),
  on(CubesActions.deleteCube, (state, { id }) => {
    return cubesAdapter.removeOne(id, state);
  }),
  on(CubesActions.deleteCubes, (state, { ids }) => {
    return cubesAdapter.removeMany(ids, state);
  }),
  on(CubesActions.deleteCubesByPredicate, (state, { predicate }) => {
    return cubesAdapter.removeMany(predicate, state);
  }),
  on(CubesActions.loadCubes, (state, { cubes }) => {
    return cubesAdapter.setAll(cubes, state);
  }),
  on(CubesActions.setCubes, (state, { cubes }) => {
    return cubesAdapter.setMany(cubes, state);
  }),
  on(CubesActions.clearCubes, (state) => {
    return cubesAdapter.removeAll({
      ...state,
      selectedCubeId: null,
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  cubesAdapter.getSelectors();

export const selectCubeIds = selectIds;
export const selectCubeEntities = selectEntities;
export const selectAllCubes = selectAll;
export const selectCubeTotal = selectTotal;
