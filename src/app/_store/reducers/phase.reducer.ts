import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Phase } from '../../_types';
import * as PhaseActions from '../actions/phase.actions';

export interface PhaseState extends EntityState<Phase> {
  selectedPhaseId: number | null;
}

export function selectPhaseId(a: Phase): number {
  return a.id;
}

export const phaseAdapter: EntityAdapter<Phase> = createEntityAdapter<Phase>({
  selectId: selectPhaseId,
  sortComparer: false,
});

export const initialState: PhaseState = phaseAdapter.getInitialState({
  selectedPhaseId: null,
});

export const phaseReducer = createReducer(
  initialState,
  on(PhaseActions.addPhase, (state, { phase }) => {
    return phaseAdapter.addOne(phase, state);
  }),
  on(PhaseActions.setPhase, (state, { phase }) => {
    return phaseAdapter.setOne(phase, state);
  }),
  on(PhaseActions.upsertPhase, (state, { phase }) => {
    return phaseAdapter.upsertOne(phase, state);
  }),
  on(PhaseActions.addPhases, (state, { phases }) => {
    return phaseAdapter.addMany(phases, state);
  }),
  on(PhaseActions.upsertPhases, (state, { phases }) => {
    return phaseAdapter.upsertMany(phases, state);
  }),
  on(PhaseActions.updatePhase, (state, { update }) => {
    return phaseAdapter.updateOne(update, state);
  }),
  on(PhaseActions.updatePhases, (state, { updates }) => {
    return phaseAdapter.updateMany(updates, state);
  }),
  on(PhaseActions.mapPhase, (state, { entityMap }) => {
    return phaseAdapter.mapOne(entityMap, state);
  }),
  on(PhaseActions.mapPhases, (state, { entityMap }) => {
    return phaseAdapter.map(entityMap, state);
  }),
  on(PhaseActions.deletePhase, (state, { id }) => {
    return phaseAdapter.removeOne(id, state);
  }),
  on(PhaseActions.deletePhases, (state, { ids }) => {
    return phaseAdapter.removeMany(ids, state);
  }),
  on(PhaseActions.deletePhasesByPredicate, (state, { predicate }) => {
    return phaseAdapter.removeMany(predicate, state);
  }),
  on(PhaseActions.loadPhases, (state, { phases }) => {
    return phaseAdapter.setAll(phases, state);
  }),
  on(PhaseActions.setPhases, (state, { phases }) => {
    return phaseAdapter.setMany(phases, state);
  }),
  on(PhaseActions.clearPhases, (state) => {
    return phaseAdapter.removeAll({
      ...state,
      selectedPhaseId: null,
      availableIds: [],
      enrolledIds: [],
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  phaseAdapter.getSelectors();

export const selectPhaseIds = selectIds;
export const selectPhaseEntities = selectEntities;
export const selectAllPhases = selectAll;
export const selectPhaseTotal = selectTotal;
