import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { User } from '../../_types';
import * as UserActions from '../actions/users.actions';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
}

export function selectUserId(a: User): number {
  return a.id;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: false,
});

export const initialState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
});

export const usersReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => {
    return usersAdapter.addOne(user, state);
  }),
  on(UserActions.setUser, (state, { user }) => {
    return usersAdapter.setOne(user, state);
  }),
  on(UserActions.upsertUser, (state, { user }) => {
    return usersAdapter.upsertOne(user, state);
  }),
  on(UserActions.addUsers, (state, { users }) => {
    return usersAdapter.addMany(users, state);
  }),
  on(UserActions.upsertUsers, (state, { users }) => {
    return usersAdapter.upsertMany(users, state);
  }),
  on(UserActions.updateUser, (state, { update }) => {
    return usersAdapter.updateOne(update, state);
  }),
  on(UserActions.updateUsers, (state, { updates }) => {
    return usersAdapter.updateMany(updates, state);
  }),
  on(UserActions.mapUser, (state, { entityMap }) => {
    return usersAdapter.mapOne(entityMap, state);
  }),
  on(UserActions.mapUsers, (state, { entityMap }) => {
    return usersAdapter.map(entityMap, state);
  }),
  on(UserActions.deleteUser, (state, { id }) => {
    return usersAdapter.removeOne(id, state);
  }),
  on(UserActions.deleteUsers, (state, { ids }) => {
    return usersAdapter.removeMany(ids, state);
  }),
  on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
    return usersAdapter.removeMany(predicate, state);
  }),
  on(UserActions.loadUsers, (state, { users }) => {
    return usersAdapter.setAll(users, state);
  }),
  on(UserActions.setUsers, (state, { users }) => {
    return usersAdapter.setMany(users, state);
  }),
  on(UserActions.clearUsers, (state) => {
    return usersAdapter.removeAll({
      ...state,
      selectedUserId: null,
    });
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  usersAdapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUserTotal = selectTotal;
