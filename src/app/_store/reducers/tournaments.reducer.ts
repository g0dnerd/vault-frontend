import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Tournament } from '../../_types';
import * as TournamentsActions from '../actions/tournaments.actions';

export interface TournamentsState extends EntityState<Tournament> {
  selectedTournamentId: number | null;
  availableIds: number[];
  enrolledIds: number[];
}

export function selectTournamentId(a: Tournament): number {
  return a.id;
}

export const tournamentsAdapter: EntityAdapter<Tournament> =
  createEntityAdapter<Tournament>({
    selectId: selectTournamentId,
    sortComparer: false,
  });

export const initialState: TournamentsState =
  tournamentsAdapter.getInitialState({
    selectedTournamentId: null,
    availableIds: [],
    enrolledIds: [],
  });

export const tournamentsReducer = createReducer(
  initialState,
  on(TournamentsActions.setAvailableTournaments, (state, { availableIds }) => ({
    ...state,
    availableIds,
  })),
  on(TournamentsActions.setEnrolledTournaments, (state, { enrolledIds }) => ({
    ...state,
    enrolledIds,
  })),
  on(TournamentsActions.addTournament, (state, { tournament }) => {
    return tournamentsAdapter.addOne(tournament, state);
  }),
  on(TournamentsActions.setTournament, (state, { tournament }) => {
    return tournamentsAdapter.setOne(tournament, state);
  }),
  on(TournamentsActions.upsertTournament, (state, { tournament }) => {
    return tournamentsAdapter.upsertOne(tournament, state);
  }),
  on(TournamentsActions.addTournaments, (state, { tournaments }) => {
    return tournamentsAdapter.addMany(tournaments, state);
  }),
  on(TournamentsActions.upsertTournaments, (state, { tournaments }) => {
    return tournamentsAdapter.upsertMany(tournaments, state);
  }),
  on(TournamentsActions.updateTournament, (state, { update }) => {
    return tournamentsAdapter.updateOne(update, state);
  }),
  on(TournamentsActions.updateTournaments, (state, { updates }) => {
    return tournamentsAdapter.updateMany(updates, state);
  }),
  on(TournamentsActions.mapTournament, (state, { entityMap }) => {
    return tournamentsAdapter.mapOne(entityMap, state);
  }),
  on(TournamentsActions.mapTournaments, (state, { entityMap }) => {
    return tournamentsAdapter.map(entityMap, state);
  }),
  on(TournamentsActions.deleteTournament, (state, { id }) => {
    return tournamentsAdapter.removeOne(id, state);
  }),
  on(TournamentsActions.deleteTournaments, (state, { ids }) => {
    return tournamentsAdapter.removeMany(ids, state);
  }),
  on(
    TournamentsActions.deleteTournamentsByPredicate,
    (state, { predicate }) => {
      return tournamentsAdapter.removeMany(predicate, state);
    },
  ),
  on(TournamentsActions.loadTournaments, (state, { tournaments }) => {
    return tournamentsAdapter.setAll(tournaments, state);
  }),
  on(TournamentsActions.setTournaments, (state, { tournaments }) => {
    return tournamentsAdapter.setMany(tournaments, state);
  }),
  on(TournamentsActions.clearTournaments, (state) => {
    return tournamentsAdapter.removeAll({
      ...state,
      selectedTournamentId: null,
      availableIds: [],
      enrolledIds: [],
    });
  }),
);

export const getAvailableIds = (state: TournamentsState) => state.availableIds;
export const getEnrolledIds = (state: TournamentsState) => state.enrolledIds;

const { selectIds, selectEntities, selectAll, selectTotal } =
  tournamentsAdapter.getSelectors();

export const selectTournamentIds = selectIds;
export const selectTournamentEntities = selectEntities;
export const selectAllTournaments = selectAll;
export const selectTournamentTotal = selectTotal;
