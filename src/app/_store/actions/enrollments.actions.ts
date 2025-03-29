import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Enrollment } from '../../_types';

const TYPE = '[Enrollments/API]';

export enum EnrollmentActionTypes {
  ENROLLMENT_STORE_FAILURE = `${TYPE} Failure`,
  INITIALIZE_ENROLLMENTS = `${TYPE} Initialize enrollments`,
  SELECT_ENROLLMENT = `${TYPE} Select enrollment`,
  LOAD_ENROLLMENTS = `${TYPE} Load enrollments`,
  SET_ENROLLMENTS = `${TYPE} Set enrollments`,
  ADD_ENROLLMENT = `${TYPE} Add enrollment`,
  SET_ENROLLMENT = `${TYPE} Set enrollment`,
  UPSERT_ENROLLMENT = `${TYPE} Upsert enrollment`,
  ADD_ENROLLMENTS = `${TYPE} Add enrollments`,
  UPSERT_ENROLLMENTS = `${TYPE} Upsert enrollments`,
  UPDATE_ENROLLMENT = `${TYPE} Update enrollment`,
  UPDATE_ENROLLMENTS = `${TYPE} Update enrollments`,
  MAP_ENROLLMENT = `${TYPE} Map enrollment`,
  MAP_ENROLLMENTS = `${TYPE} Map enrollments`,
  DELETE_ENROLLMENT = `${TYPE} Delete enrollment`,
  DELETE_ENROLLMENTS = `${TYPE} Delete enrollments`,
  DELETE_ENROLLMENTS_BY_PREDICATE = `${TYPE} Delete enrollments by predicate`,
  CLEAR_ENROLLMENTS = `${TYPE} Clear enrollments`,
}

export const enrollmentStoreFailure = createAction(
  EnrollmentActionTypes.ENROLLMENT_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializeEnrollments = createAction(
  EnrollmentActionTypes.INITIALIZE_ENROLLMENTS,
);
export const selectEnrollment = createAction(
  EnrollmentActionTypes.SELECT_ENROLLMENT,
  props<{ enrollmentId: number }>(),
);
export const loadEnrollments = createAction(
  EnrollmentActionTypes.LOAD_ENROLLMENTS,
  props<{ enrollments: Enrollment[] }>(),
);
export const setEnrollments = createAction(
  EnrollmentActionTypes.SET_ENROLLMENTS,
  props<{ enrollments: Enrollment[] }>(),
);
export const addEnrollment = createAction(
  EnrollmentActionTypes.ADD_ENROLLMENT,
  props<{ enrollment: Enrollment }>(),
);
export const setEnrollment = createAction(
  EnrollmentActionTypes.SET_ENROLLMENT,
  props<{ enrollment: Enrollment }>(),
);
export const upsertEnrollment = createAction(
  EnrollmentActionTypes.UPSERT_ENROLLMENT,
  props<{ enrollment: Enrollment }>(),
);
export const addEnrollments = createAction(
  EnrollmentActionTypes.ADD_ENROLLMENTS,
  props<{ enrollments: Enrollment[] }>(),
);
export const upsertEnrollments = createAction(
  EnrollmentActionTypes.UPSERT_ENROLLMENTS,
  props<{ enrollments: Enrollment[] }>(),
);
export const updateEnrollment = createAction(
  EnrollmentActionTypes.UPDATE_ENROLLMENT,
  props<{ update: Update<Enrollment> }>(),
);
export const updateEnrollments = createAction(
  EnrollmentActionTypes.UPDATE_ENROLLMENTS,
  props<{ updates: Update<Enrollment>[] }>(),
);
export const mapEnrollment = createAction(
  EnrollmentActionTypes.MAP_ENROLLMENT,
  props<{ entityMap: EntityMapOne<Enrollment> }>(),
);
export const mapEnrollments = createAction(
  EnrollmentActionTypes.MAP_ENROLLMENTS,
  props<{ entityMap: EntityMap<Enrollment> }>(),
);
export const deleteEnrollment = createAction(
  EnrollmentActionTypes.DELETE_ENROLLMENT,
  props<{ id: number }>(),
);
export const deleteEnrollments = createAction(
  EnrollmentActionTypes.DELETE_ENROLLMENTS,
  props<{ ids: number[] }>(),
);
export const deleteEnrollmentsByPredicate = createAction(
  EnrollmentActionTypes.DELETE_ENROLLMENTS_BY_PREDICATE,
  props<{ predicate: Predicate<Enrollment> }>(),
);
export const clearEnrollments = createAction(
  EnrollmentActionTypes.CLEAR_ENROLLMENTS,
);
