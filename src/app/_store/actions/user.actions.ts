import { Predicate } from '@angular/core';
import { Update, EntityMapOne, EntityMap } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { User } from '../../_types';

const TYPE = '[Users/API]';

export enum UserActionTypes {
  USER_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_ALL_USERS = `${TYPE} Initialize all users`,
  INITIALIZE_AVAILABLE_USERS_FOR_TOURNAMENT = `${TYPE} Initialize available users for tournament`,
  SELECT_USER = `${TYPE} Select user`,
  LOAD_USERS = `${TYPE} Load users`,
  SET_USERS = `${TYPE} Set users`,
  ADD_USER = `${TYPE} Add user`,
  SET_USER = `${TYPE} Set user`,
  UPSERT_USER = `${TYPE} Upsert user`,
  ADD_USERS = `${TYPE} Add users`,
  UPSERT_USERS = `${TYPE} Upsert users`,
  UPDATE_USER = `${TYPE} Update user`,
  UPDATE_USERS = `${TYPE} Update users`,
  MAP_USER = `${TYPE} Map user`,
  MAP_USERS = `${TYPE} Map users`,
  DELETE_USER = `${TYPE} Delete user`,
  DELETE_USERS = `${TYPE} Delete users`,
  DELETE_USERS_BY_PREDICATE = `${TYPE} Delete users by predicate`,
  CLEAR_USERS = `${TYPE} Clear users`,
}

export const userStoreFailure = createAction(
  UserActionTypes.USER_STORE_FAILURE,
  props<{ errorMessage: string }>(),
);
export const initializeAllUsers = createAction(
  UserActionTypes.INITIALIZE_ALL_USERS,
);
export const initializeAvailableUsersForTournament = createAction(
  UserActionTypes.INITIALIZE_AVAILABLE_USERS_FOR_TOURNAMENT,
  props<{ tournamentId: number }>(),
);
export const selectUser = createAction(
  UserActionTypes.SELECT_USER,
  props<{ userId: number }>(),
);
export const loadUsers = createAction(
  UserActionTypes.LOAD_USERS,
  props<{ users: User[] }>(),
);
export const setUsers = createAction(
  UserActionTypes.SET_USERS,
  props<{ users: User[] }>(),
);
export const addUser = createAction(
  UserActionTypes.ADD_USER,
  props<{ user: User }>(),
);
export const setUser = createAction(
  UserActionTypes.SET_USER,
  props<{ user: User }>(),
);
export const upsertUser = createAction(
  UserActionTypes.UPSERT_USER,
  props<{ user: User }>(),
);
export const addUsers = createAction(
  UserActionTypes.ADD_USERS,
  props<{ users: User[] }>(),
);
export const upsertUsers = createAction(
  UserActionTypes.UPSERT_USERS,
  props<{ users: User[] }>(),
);
export const updateUser = createAction(
  UserActionTypes.UPDATE_USER,
  props<{ update: Update<User> }>(),
);
export const updateUsers = createAction(
  UserActionTypes.UPDATE_USERS,
  props<{ updates: Update<User>[] }>(),
);
export const mapUser = createAction(
  UserActionTypes.MAP_USER,
  props<{ entityMap: EntityMapOne<User> }>(),
);
export const mapUsers = createAction(
  UserActionTypes.MAP_USERS,
  props<{ entityMap: EntityMap<User> }>(),
);
export const deleteUser = createAction(
  UserActionTypes.DELETE_USER,
  props<{ id: number }>(),
);
export const deleteUsers = createAction(
  UserActionTypes.DELETE_USERS,
  props<{ ids: number[] }>(),
);
export const deleteUsersByPredicate = createAction(
  UserActionTypes.DELETE_USERS_BY_PREDICATE,
  props<{ predicate: Predicate<User> }>(),
);
export const clearUsers = createAction(UserActionTypes.CLEAR_USERS);
