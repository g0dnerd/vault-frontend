import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Enrollment } from '../../_types';
import * as EnrollmentActions from '../actions/enrollment.actions';

export interface EnrollmentState extends EntityState<Enrollment> {
  selectedEnrollmentId: number | null;
  leaguePlayerIds: number[];
}

export function selectEnrollmentId(a: Enrollment): number {
  return a.id;
}

export const enrollmentAdapter: EntityAdapter<Enrollment> =
  createEntityAdapter<Enrollment>({
    selectId: selectEnrollmentId,
    sortComparer: false,
  });

export const initialState: EnrollmentState = enrollmentAdapter.getInitialState({
  selectedEnrollmentId: null,
  leaguePlayerIds: [],
});

export const enrollmentReducer = createReducer(
  initialState,
  on(EnrollmentActions.setLeaguePlayers, (state, { ids }) => ({
    ...state,
    leaguePlayerIds: ids,
  })),
  on(EnrollmentActions.addEnrollment, (state, { enrollment }) => {
    return enrollmentAdapter.addOne(enrollment, state);
  }),
  on(EnrollmentActions.setEnrollment, (state, { enrollment }) => {
    return enrollmentAdapter.setOne(enrollment, state);
  }),
  on(EnrollmentActions.upsertEnrollment, (state, { enrollment }) => {
    return enrollmentAdapter.upsertOne(enrollment, state);
  }),
  on(EnrollmentActions.addEnrollments, (state, { enrollments }) => {
    return enrollmentAdapter.addMany(enrollments, state);
  }),
  on(EnrollmentActions.upsertEnrollments, (state, { enrollments }) => {
    return enrollmentAdapter.upsertMany(enrollments, state);
  }),
  on(EnrollmentActions.updateEnrollment, (state, { update }) => {
    return enrollmentAdapter.updateOne(update, state);
  }),
  on(EnrollmentActions.updateEnrollments, (state, { updates }) => {
    return enrollmentAdapter.updateMany(updates, state);
  }),
  on(EnrollmentActions.mapEnrollment, (state, { entityMap }) => {
    return enrollmentAdapter.mapOne(entityMap, state);
  }),
  on(EnrollmentActions.mapEnrollments, (state, { entityMap }) => {
    return enrollmentAdapter.map(entityMap, state);
  }),
  on(EnrollmentActions.deleteEnrollment, (state, { id }) => {
    return enrollmentAdapter.removeOne(id, state);
  }),
  on(EnrollmentActions.deleteEnrollments, (state, { ids }) => {
    return enrollmentAdapter.removeMany(ids, state);
  }),
  on(EnrollmentActions.deleteEnrollmentsByPredicate, (state, { predicate }) => {
    return enrollmentAdapter.removeMany(predicate, state);
  }),
  on(EnrollmentActions.loadEnrollments, (state, { enrollments }) => {
    return enrollmentAdapter.setAll(enrollments, state);
  }),
  on(EnrollmentActions.setEnrollments, (state, { enrollments }) => {
    return enrollmentAdapter.setMany(enrollments, state);
  }),
  on(EnrollmentActions.clearEnrollments, (state) => {
    return enrollmentAdapter.removeAll({
      ...state,
      selectedEnrollmentId: null,
    });
  }),
);

export const getLeaguePlayerIds = (state: EnrollmentState) =>
  state.leaguePlayerIds;

const { selectIds, selectEntities, selectAll, selectTotal } =
  enrollmentAdapter.getSelectors();

export const selectEnrollmentIds = selectIds;
export const selectEnrollmentEntities = selectEntities;
export const selectAllEnrollments = selectAll;
export const selectEnrollmentTotal = selectTotal;
