import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { User } from '../../_types';
import * as UserActions from '../actions/user.actions';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
}

export function selectUserId(a: User): number {
  return a.id;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: false,
});

export const initialState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => {
    return userAdapter.addOne(user, state);
  }),
  on(UserActions.setUser, (state, { user }) => {
    return userAdapter.setOne(user, state);
  }),
  on(UserActions.upsertUser, (state, { user }) => {
    return userAdapter.upsertOne(user, state);
  }),
  on(UserActions.addUsers, (state, { users }) => {
    return userAdapter.addMany(users, state);
  }),
  on(UserActions.upsertUsers, (state, { users }) => {
    return userAdapter.upsertMany(users, state);
  }),
  on(UserActions.updateUser, (state, { update }) => {
    return userAdapter.updateOne(update, state);
  }),
  on(UserActions.updateUsers, (state, { updates }) => {
    return userAdapter.updateMany(updates, state);
  }),
  on(UserActions.mapUser, (state, { entityMap }) => {
    return userAdapter.mapOne(entityMap, state);
  }),
  on(UserActions.mapUsers, (state, { entityMap }) => {
    return userAdapter.map(entityMap, state);
  }),
  on(UserActions.deleteUser, (state, { id }) => {
    return userAdapter.removeOne(id, state);
  }),
  on(UserActions.deleteUsers, (state, { ids }) => {
    return userAdapter.removeMany(ids, state);
  }),
  on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
    return userAdapter.removeMany(predicate, state);
  }),
  on(UserActions.loadUsers, (state, { users }) => {
    return userAdapter.setAll(users, state);
  }),
  on(UserActions.setUsers, (state, { users }) => {
    return userAdapter.setMany(users, state);
  }),
  on(UserActions.clearUsers, (state) => {
    return userAdapter.removeAll({
      ...state,
      selectedUserId: null,
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  userAdapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUserTotal = selectTotal;
