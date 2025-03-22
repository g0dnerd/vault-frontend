import { createAction, props } from '@ngrx/store';

import { AuthPayload, GoogleAuthPayload, Role, User } from '../../_types';

const TYPE = '[Auth]';

export enum AuthActionTypes {
  AUTH_SUCCESS = `${TYPE} Auth Success`,
  REFRESH_AUTH = `${TYPE} Refresh Auth`,
  INIT_PROFILE = `${TYPE} Initialize profile data`,
  INIT_PROFILE_SUCCESS = `${TYPE} Initialize profile data success`,
  INIT_PROFILE_FAILURE = `${TYPE} Initialize profile data failure`,
  INIT_ROLES = `${TYPE} Initialize roles`,
  INIT_ROLES_SUCCESS = `${TYPE} Initialize roles success`,
  INIT_ROLES_FAILURE = `${TYPE} Initialize roles failure`,
  LOGIN = `${TYPE} Login`,
  LOGIN_FAILURE = `${TYPE} Login Failure`,
  SOCIAL_LOGIN = `${TYPE} Social Login`,
  SOCIAL_LOGIN_FAILURE = `${TYPE} Social Login Failure`,
  LOGOUT = `${TYPE} Logout`,
  REGISTER = `${TYPE} Register`,
  REGISTER_FAILURE = `${TYPE} Register Failure`,
  UPDATE_USER = `${TYPE} Update User`,
  UPDATE_USER_SUCCESS = `${TYPE} Update User Success`,
  UPDATE_USER_FAILURE = `${TYPE} Update User Failure`,
}

export const refreshAuth = createAction(
  AuthActionTypes.REFRESH_AUTH,
  props<{ token: string; roles: Role[] }>(),
);

// Stores auth data in redux state and local storage and returns
// to returnUrl, if given
export const authSuccess = createAction(
  AuthActionTypes.AUTH_SUCCESS,
  props<{ token: string; roles: Role[]; returnUrl?: string }>(),
);

// Tries to authenticate to the backend using loginData and
// returns to returnUrl on success
export const login = createAction(
  AuthActionTypes.LOGIN,
  props<{ loginData: AuthPayload; returnUrl: string }>(),
);

// Stores an error message in state and resets authentication because
// the login attempt failed
export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ errorMessage: string }>(),
);

// Tries to authenticate to the backend using loginData and
// returns to returnUrl on success
export const socialLogin = createAction(
  AuthActionTypes.SOCIAL_LOGIN,
  props<{ loginData: GoogleAuthPayload; returnUrl: string }>(),
);

// Stores an error message in state and resets authentication because
// the login attempt failed
export const socialLoginFailure = createAction(
  AuthActionTypes.SOCIAL_LOGIN_FAILURE,
  props<{ errorMessage: string }>(),
);

// Removes auth data from cache and from local storage
export const logout = createAction(AuthActionTypes.LOGOUT);

// Tries to register a new user to the backend using registerData.
export const register = createAction(
  AuthActionTypes.REGISTER,
  props<{ registerData: AuthPayload }>(),
);

// Stores an error message in state and resets authentication because
// the registration attempt failed
export const registerFailure = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{ errorMessage: string }>(),
);

export const initProfile = createAction(AuthActionTypes.INIT_PROFILE);

export const initProfileSuccess = createAction(
  AuthActionTypes.INIT_PROFILE_SUCCESS,
  props<{ user: User }>(),
);

export const initProfileFailure = createAction(
  AuthActionTypes.INIT_PROFILE_FAILURE,
  props<{ errorMessage: string }>(),
);

export const initRoles = createAction(AuthActionTypes.INIT_ROLES);

export const initRolesSuccess = createAction(
  AuthActionTypes.INIT_ROLES_SUCCESS,
  props<{ roles: Role[] }>(),
);

export const initRolesFailure = createAction(
  AuthActionTypes.INIT_ROLES_FAILURE,
  props<{ errorMessage: string }>(),
);

// Attempts a PATCH request to the API to update the currently logged in user.
export const updateUser = createAction(
  AuthActionTypes.UPDATE_USER,
  props<{ user: { email: string; username: string; bio?: string } }>(),
);

// Returns authentication data for the now changed user to ensure validity
// among API, cache and local storage.
export const updateUserSuccess = createAction(
  AuthActionTypes.UPDATE_USER_SUCCESS,
  props<{ user: User }>(),
);

// Stores an error message in state and resets authentication because
// the user update attempt failed
export const updateUserFailure = createAction(
  AuthActionTypes.UPDATE_USER_FAILURE,
  props<{ errorMessage: string }>(),
);
