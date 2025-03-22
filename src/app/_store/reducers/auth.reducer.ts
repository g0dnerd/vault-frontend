import { createReducer, on } from '@ngrx/store';

import { Role, User } from '../../_types';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  roles: Role[];
  profileData: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  token: null,
  roles: [],
  profileData: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.refreshAuth, (state, { token, roles }) => ({
    ...state,
    token,
    roles,
    errorMessage: null,
  })),
  on(AuthActions.authSuccess, (state, { token, roles }) => ({
    ...state,
    token,
    roles,
    errorMessage: null,
  })),
  on(AuthActions.loginFailure, (_state, { errorMessage }) => ({
    roles: [],
    profileData: null,
    token: null,
    errorMessage,
  })),
  // On logout, clears state
  on(AuthActions.logout, (_state) => ({
    token: null,
    roles: [],
    profileData: null,
    errorMessage: null,
  })),
  // On failed registration, removes authentication and user from state
  on(AuthActions.registerFailure, (_state, { errorMessage }) => ({
    roles: [],
    profileData: null,
    token: null,
    errorMessage,
  })),
  on(AuthActions.initProfileSuccess, (state, { user }) => ({
    ...state,
    profileData: user,
    errorMessage: null,
  })),
  on(AuthActions.initProfileFailure, (state, { errorMessage }) => ({
    ...state,
    profileData: null,
    errorMessage,
  })),
  on(AuthActions.initRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
    errorMessage: null,
  })),
  on(AuthActions.initRolesFailure, (state, { errorMessage }) => ({
    ...state,
    roles: [Role.Player],
    errorMessage,
  })),
);
