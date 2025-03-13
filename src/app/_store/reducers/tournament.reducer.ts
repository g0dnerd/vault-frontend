import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Tournament } from '../../_types';
import * as TournamentActions from '../actions/tournament.actions';

export interface TournamentState extends EntityState<Tournament> {
  selectedTournamentId: number | null;
  availableIds: number[];
  enrolledIds: number[];
}

export function selectTournamentId(a: Tournament): number {
  return a.id;
}

export const tournamentAdapter: EntityAdapter<Tournament> =
  createEntityAdapter<Tournament>({
    selectId: selectTournamentId,
    sortComparer: false,
  });

export const initialState: TournamentState = tournamentAdapter.getInitialState({
  selectedTournamentId: null,
  availableIds: [],
  enrolledIds: [],
});

export const tournamentReducer = createReducer(
  initialState,
  on(TournamentActions.setAvailableTournaments, (state, { ids }) => ({
    ...state,
    availableIds: ids,
  })),
  on(TournamentActions.setEnrolledTournaments, (state, { ids }) => ({
    ...state,
    enrolledIds: ids,
  })),
  on(TournamentActions.addTournament, (state, { tournament }) => {
    return tournamentAdapter.addOne(tournament, state);
  }),
  on(TournamentActions.setTournament, (state, { tournament }) => {
    return tournamentAdapter.setOne(tournament, state);
  }),
  on(TournamentActions.upsertTournament, (state, { tournament }) => {
    return tournamentAdapter.upsertOne(tournament, state);
  }),
  on(TournamentActions.addTournaments, (state, { tournaments }) => {
    return tournamentAdapter.addMany(tournaments, state);
  }),
  on(TournamentActions.upsertTournaments, (state, { tournaments }) => {
    return tournamentAdapter.upsertMany(tournaments, state);
  }),
  on(TournamentActions.updateTournament, (state, { update }) => {
    return tournamentAdapter.updateOne(update, state);
  }),
  on(TournamentActions.updateTournaments, (state, { updates }) => {
    return tournamentAdapter.updateMany(updates, state);
  }),
  on(TournamentActions.mapTournament, (state, { entityMap }) => {
    return tournamentAdapter.mapOne(entityMap, state);
  }),
  on(TournamentActions.mapTournaments, (state, { entityMap }) => {
    return tournamentAdapter.map(entityMap, state);
  }),
  on(TournamentActions.deleteTournament, (state, { id }) => {
    return tournamentAdapter.removeOne(id, state);
  }),
  on(TournamentActions.deleteTournaments, (state, { ids }) => {
    return tournamentAdapter.removeMany(ids, state);
  }),
  on(TournamentActions.deleteTournamentsByPredicate, (state, { predicate }) => {
    return tournamentAdapter.removeMany(predicate, state);
  }),
  on(TournamentActions.loadTournaments, (state, { tournaments }) => {
    return tournamentAdapter.setAll(tournaments, state);
  }),
  on(TournamentActions.setTournaments, (state, { tournaments }) => {
    return tournamentAdapter.setMany(tournaments, state);
  }),
  on(TournamentActions.clearTournaments, (state) => {
    return tournamentAdapter.removeAll({
      ...state,
      selectedTournamentId: null,
      availableIds: [],
      enrolledIds: [],
    });
  }),
);

export const getAvailableIds = (state: TournamentState) => state.availableIds;
export const getEnrolledIds = (state: TournamentState) => state.enrolledIds;

const { selectIds, selectEntities, selectAll, selectTotal } =
  tournamentAdapter.getSelectors();

export const selectTournamentIds = selectIds;
export const selectTournamentEntities = selectEntities;
export const selectAllTournaments = selectAll;
export const selectTournamentTotal = selectTotal;
