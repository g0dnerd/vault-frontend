import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Enrollment } from '../../_types';
import * as EnrollmentActions from '../actions/enrollments.actions';

export interface EnrollmentsState extends EntityState<Enrollment> {
  selectedEnrollmentId: number | null;
}

export function selectEnrollmentId(a: Enrollment): number {
  return a.id;
}

export const enrollmentsAdapter: EntityAdapter<Enrollment> =
  createEntityAdapter<Enrollment>({
    selectId: selectEnrollmentId,
    sortComparer: false,
  });

export const initialState: EnrollmentsState =
  enrollmentsAdapter.getInitialState({
    selectedEnrollmentId: null,
  });

export const enrollmentsReducer = createReducer(
  initialState,
  on(EnrollmentActions.addEnrollment, (state, { enrollment }) => {
    return enrollmentsAdapter.addOne(enrollment, state);
  }),
  on(EnrollmentActions.setEnrollment, (state, { enrollment }) => {
    return enrollmentsAdapter.setOne(enrollment, state);
  }),
  on(EnrollmentActions.upsertEnrollment, (state, { enrollment }) => {
    return enrollmentsAdapter.upsertOne(enrollment, state);
  }),
  on(EnrollmentActions.addEnrollments, (state, { enrollments }) => {
    return enrollmentsAdapter.addMany(enrollments, state);
  }),
  on(EnrollmentActions.upsertEnrollments, (state, { enrollments }) => {
    return enrollmentsAdapter.upsertMany(enrollments, state);
  }),
  on(EnrollmentActions.updateEnrollment, (state, { update }) => {
    return enrollmentsAdapter.updateOne(update, state);
  }),
  on(EnrollmentActions.updateEnrollments, (state, { updates }) => {
    return enrollmentsAdapter.updateMany(updates, state);
  }),
  on(EnrollmentActions.mapEnrollment, (state, { entityMap }) => {
    return enrollmentsAdapter.mapOne(entityMap, state);
  }),
  on(EnrollmentActions.mapEnrollments, (state, { entityMap }) => {
    return enrollmentsAdapter.map(entityMap, state);
  }),
  on(EnrollmentActions.deleteEnrollment, (state, { id }) => {
    return enrollmentsAdapter.removeOne(id, state);
  }),
  on(EnrollmentActions.deleteEnrollments, (state, { ids }) => {
    return enrollmentsAdapter.removeMany(ids, state);
  }),
  on(EnrollmentActions.deleteEnrollmentsByPredicate, (state, { predicate }) => {
    return enrollmentsAdapter.removeMany(predicate, state);
  }),
  on(EnrollmentActions.loadEnrollments, (state, { enrollments }) => {
    return enrollmentsAdapter.setAll(enrollments, state);
  }),
  on(EnrollmentActions.setEnrollments, (state, { enrollments }) => {
    return enrollmentsAdapter.setMany(enrollments, state);
  }),
  on(EnrollmentActions.clearEnrollments, (state) => {
    return enrollmentsAdapter.removeAll({
      ...state,
      selectedEnrollmentId: null,
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  enrollmentsAdapter.getSelectors();

export const selectEnrollmentIds = selectIds;
export const selectEnrollmentEntities = selectEntities;
export const selectAllEnrollments = selectAll;
export const selectEnrollmentTotal = selectTotal;
