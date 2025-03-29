import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Phase } from '../../_types';
import * as PhasesActions from '../actions/phases.actions';

export interface PhasesState extends EntityState<Phase> {
  selectedPhaseId: number | null;
}

export function selectPhaseId(a: Phase): number {
  return a.id;
}

export const phasesAdapter: EntityAdapter<Phase> = createEntityAdapter<Phase>({
  selectId: selectPhaseId,
  sortComparer: false,
});

export const initialState: PhasesState = phasesAdapter.getInitialState({
  selectedPhaseId: null,
});

export const phasesReducer = createReducer(
  initialState,
  on(PhasesActions.addPhase, (state, { phase }) => {
    return phasesAdapter.addOne(phase, state);
  }),
  on(PhasesActions.setPhase, (state, { phase }) => {
    return phasesAdapter.setOne(phase, state);
  }),
  on(PhasesActions.upsertPhase, (state, { phase }) => {
    return phasesAdapter.upsertOne(phase, state);
  }),
  on(PhasesActions.addPhases, (state, { phases }) => {
    return phasesAdapter.addMany(phases, state);
  }),
  on(PhasesActions.upsertPhases, (state, { phases }) => {
    return phasesAdapter.upsertMany(phases, state);
  }),
  on(PhasesActions.updatePhase, (state, { update }) => {
    return phasesAdapter.updateOne(update, state);
  }),
  on(PhasesActions.updatePhases, (state, { updates }) => {
    return phasesAdapter.updateMany(updates, state);
  }),
  on(PhasesActions.mapPhase, (state, { entityMap }) => {
    return phasesAdapter.mapOne(entityMap, state);
  }),
  on(PhasesActions.mapPhases, (state, { entityMap }) => {
    return phasesAdapter.map(entityMap, state);
  }),
  on(PhasesActions.deletePhase, (state, { id }) => {
    return phasesAdapter.removeOne(id, state);
  }),
  on(PhasesActions.deletePhases, (state, { ids }) => {
    return phasesAdapter.removeMany(ids, state);
  }),
  on(PhasesActions.deletePhasesByPredicate, (state, { predicate }) => {
    return phasesAdapter.removeMany(predicate, state);
  }),
  on(PhasesActions.loadPhases, (state, { phases }) => {
    return phasesAdapter.setAll(phases, state);
  }),
  on(PhasesActions.setPhases, (state, { phases }) => {
    return phasesAdapter.setMany(phases, state);
  }),
  on(PhasesActions.clearPhases, (state) => {
    return phasesAdapter.removeAll({
      ...state,
      selectedPhaseId: null,
      availableIds: [],
      enrolledIds: [],
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  phasesAdapter.getSelectors();

export const selectPhaseIds = selectIds;
export const selectPhaseEntities = selectEntities;
export const selectAllPhases = selectAll;
export const selectPhaseTotal = selectTotal;
