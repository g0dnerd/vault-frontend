import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import {
  Cube,
  Draft,
  Enrollment,
  Image,
  Phase,
  Role,
  Tournament,
  User,
} from '../_types';
import * as fromCube from './reducers/cubes.reducer';
import * as fromEnrollment from './reducers/enrollments.reducer';
import * as fromImage from './reducers/images.reducer';
import * as fromPhase from './reducers/phases.reducer';
import * as fromTournament from './reducers/tournaments.reducer';
import * as fromUser from './reducers/users.reducer';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { draftsReducer, DraftsState } from './reducers/drafts.reducer';
import { matchesReducer, MatchesState } from './reducers/matches.reducer';
import { playersReducer, PlayersState } from './reducers/players.reducer';
import { standingsReducer, StandingsState } from './reducers/standings.reducer';
import { hydrationMetaReducer } from './reducers/hydration.reducer';

export interface State {
  auth: AuthState;
  cubes: fromCube.CubesState;
  drafts: DraftsState;
  enrollments: fromEnrollment.EnrollmentsState;
  images: fromImage.ImagesState;
  matches: MatchesState;
  phases: fromPhase.PhasesState;
  players: PlayersState;
  standings: StandingsState;
  tournaments: fromTournament.TournamentsState;
  users: fromUser.UsersState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  cubes: fromCube.cubesReducer,
  drafts: draftsReducer,
  enrollments: fromEnrollment.enrollmentsReducer,
  images: fromImage.imagesReducer,
  matches: matchesReducer,
  phases: fromPhase.phasesReducer,
  players: playersReducer,
  standings: standingsReducer,
  tournaments: fromTournament.tournamentsReducer,
  users: fromUser.usersReducer,
};

// MATCHES
export const selectMatches = (state: State) => state.matches;
export const selectCurrentMatch = createSelector(
  selectMatches,
  (state: MatchesState) => state.current,
);
export const selectOngoingMatches = createSelector(
  selectMatches,
  (state: MatchesState) => state.ongoing,
);

// PLAYERS
export const selectPlayers = (state: State) => state.players;
export const selectAllPlayers = createSelector(
  selectPlayers,
  (state: PlayersState) => state.players,
);
export const selectPlayersForDraft = (draftId: number) =>
  createSelector(selectAllPlayers, (players) =>
    players.filter((player) => player.draftId == draftId),
  );

export const selectCurrentPoolStatus = createSelector(
  selectPlayers,
  (state: PlayersState) => state.status,
);

// TOURNAMENTS
export const selectTournamentState =
  createFeatureSelector<fromTournament.TournamentsState>('tournaments');
export const selectTournamentsLoading = createSelector(
  selectTournamentState,
  (state) => state.loading,
);
export const selectTournamentIds = createSelector(
  selectTournamentState,
  fromTournament.selectTournamentIds,
);
export const selectTournamentEntities = createSelector(
  selectTournamentState,
  fromTournament.selectTournamentEntities,
);
export const selectAllTournaments = createSelector(
  selectTournamentState,
  fromTournament.selectAllTournaments,
);
export const selectTournamentTotal = createSelector(
  selectTournamentState,
  fromTournament.selectTournamentTotal,
);
export const selectSelectedTournamentId = createSelector(
  selectTournamentState,
  fromTournament.getSelectedId,
);
export const selectSelectedTournament = createSelector(
  selectTournamentEntities,
  selectSelectedTournamentId,
  (entities, id) => {
    if (id) return entities[id];
    else return null;
  },
);
export const selectTournamentById = (tournamentId: number) =>
  createSelector(
    selectTournamentState,
    (tournamentState) => tournamentState.entities[tournamentId],
  );
export const selectTournamentByQuery = (
  query: (tournament: Tournament) => boolean,
) =>
  createSelector(selectTournamentState, (state) => {
    return Object.values(state.entities).find(
      (tournament): tournament is Tournament =>
        !!tournament && query(tournament),
    );
  });
export const selectAvailableTournamentIds = createSelector(
  selectTournamentState,
  fromTournament.getAvailableIds,
);
export const selectAvailableTournaments = createSelector(
  selectTournamentEntities,
  selectAvailableTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament => tournament !== undefined,
      ),
);
export const selectEnrolledTournamentIds = createSelector(
  selectTournamentState,
  fromTournament.getEnrolledIds,
);
export const selectEnrolledTournaments = createSelector(
  selectTournamentEntities,
  selectEnrolledTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament => tournament !== undefined,
      ),
);

// IMAGES
export const selectImageState =
  createFeatureSelector<fromImage.ImagesState>('images');
export const selectImageIds = createSelector(
  selectImageState,
  fromImage.selectImageIds,
);
export const selectImageEntities = createSelector(
  selectImageState,
  fromImage.selectImageEntities,
);
export const selectAllImages = createSelector(
  selectImageState,
  fromImage.selectAllImages,
);
export const selectImageTotal = createSelector(
  selectImageState,
  fromImage.selectImageTotal,
);
export const selectImageById = (imageId: number) =>
  createSelector(
    selectImageState,
    (imageState) => imageState.entities[imageId],
  );
export const selectImageByQuery = (query: (image: Image) => boolean) =>
  createSelector(selectImageState, (state) => {
    return Object.values(state.entities).find(
      (image): image is Image => !!image && query(image),
    );
  });
export const selectPlayerImageIds = createSelector(
  selectImageState,
  fromImage.getPlayerImageIds,
);
export const selectPlayerImages = createSelector(
  selectImageEntities,
  selectPlayerImageIds,
  (images, ids) =>
    ids
      .map((id) => images[id])
      .filter((image): image is Image => image !== undefined),
);

// AUTH
export interface AuthAppState {
  auth: AuthState;
}
export const selectAuth = (state: AuthAppState) => state.auth;
export const selectAuthStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.token !== null,
);
export const selectAuthToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token,
);
export const selectProfileData = createSelector(
  selectAuth,
  (state: AuthState) => state.profileData,
);
export const selectUsername = createSelector(
  selectAuth,
  (state: AuthState) => state.profileData?.username,
);
export const selectCurrentUserRoles = createSelector(
  selectAuth,
  (state: AuthState) => state.roles,
);
export const selectAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.roles.includes(Role.Admin),
);
export const selectPlayerAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.roles.includes(Role.PlayerAdmin),
);
export const selectAuthErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage,
);

// DRAFTS
export const selectDrafts = (state: State) => state.drafts;
export const selectOngoingDrafts = createSelector(
  selectDrafts,
  (state: DraftsState) => state.ongoing,
);
export const selectCurrentDraft = createSelector(
  selectDrafts,
  (state: DraftsState) => state.current,
);
export const selectDraftById = (draftId: number) =>
  createSelector(selectOngoingDrafts, (ongoing: Draft[]) => {
    return ongoing.find((draft): draft is Draft => draft.id == draftId);
  });

// ENROLLMENTS
export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.EnrollmentsState>('enrollments');
export const selectEnrollmentIds = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectEnrollmentIds,
);
export const selectEnrollmentEntities = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectEnrollmentEntities,
);
export const selectAllEnrollments = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectAllEnrollments,
);
export const selectEnrollmentTotal = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectEnrollmentTotal,
);
export const selectEnrollmentById = (enrollmentId: number) =>
  createSelector(
    selectEnrollmentState,
    (enrollmentState) => enrollmentState.entities[enrollmentId],
  );
export const selectDistinctEnrollments = createSelector(
  selectEnrollmentState,
  (state) => {
    const distinctTournaments = [];
    const map = new Map();
    for (const enrollment of Object.values(state.entities)) {
      if (!enrollment) continue;
      if (!map.has(enrollment.tournamentId)) {
        map.set(enrollment.tournamentId, true);
        distinctTournaments.push(enrollment);
      }
    }
    return distinctTournaments;
  },
);
export const selectEnrollmentsForTournament = (tournamentId: number) =>
  createSelector(selectEnrollmentState, (state) => {
    return Object.values(state.entities).filter(
      (enrollment): enrollment is Enrollment =>
        !!enrollment && enrollment.tournamentId === tournamentId,
    );
  });
export const selectEnrollmentByQuery = (
  query: (enrollment: Enrollment) => boolean,
) =>
  createSelector(selectEnrollmentState, (state) => {
    return Object.values(state.entities).find(
      (enrollment): enrollment is Enrollment =>
        !!enrollment && query(enrollment),
    );
  });

// CUBES
export const selectCubeState =
  createFeatureSelector<fromCube.CubesState>('cubes');
export const selectCubesLoading = createSelector(
  selectCubeState,
  (state) => state.loading,
);
export const selectCubesErrorMessage = createSelector(
  selectCubeState,
  (state) => state.errorMessage,
);
export const selectCubeIds = createSelector(
  selectCubeState,
  fromCube.selectCubeIds,
);
export const selectCubeEntities = createSelector(
  selectCubeState,
  fromCube.selectCubeEntities,
);
export const selectAllCubes = createSelector(
  selectCubeState,
  fromCube.selectAllCubes,
);
export const selectCubeTotal = createSelector(
  selectCubeState,
  fromCube.selectCubeTotal,
);
export const selectCubeById = (cubeId: number) =>
  createSelector(selectCubeState, (cubeState) => cubeState.entities[cubeId]);
export const selectCubeByQuery = (query: (cube: Cube) => boolean) =>
  createSelector(selectCubeState, (state) => {
    return Object.values(state.entities).find(
      (cube): cube is Cube => !!cube && query(cube),
    );
  });

// STANDINGS
export const selectStandings = (state: State) => state.standings;
export const selectTournamentStandings = createSelector(
  selectStandings,
  (state: StandingsState) => state.tournamentStandings,
);

// USERS
export const selectUserState =
  createFeatureSelector<fromUser.UsersState>('users');
export const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds,
);
export const selectUserEntities = createSelector(
  selectUserState,
  fromUser.selectUserEntities,
);
export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers,
);
export const selectUserTotal = createSelector(
  selectUserState,
  fromUser.selectUserTotal,
);
export const selectUserById = (userId: number) =>
  createSelector(selectUserState, (userState) => userState.entities[userId]);
export const selectUserByQuery = (query: (user: User) => boolean) =>
  createSelector(selectUserState, (state) => {
    return Object.values(state.entities).find(
      (user): user is User => !!user && query(user),
    );
  });

// PHASES
export const selectPhaseState =
  createFeatureSelector<fromPhase.PhasesState>('phases');
export const selectPhaseIds = createSelector(
  selectPhaseState,
  fromPhase.selectPhaseIds,
);
export const selectPhaseEntities = createSelector(
  selectPhaseState,
  fromPhase.selectPhaseEntities,
);
export const selectAllPhases = createSelector(
  selectPhaseState,
  fromPhase.selectAllPhases,
);
export const selectPhaseTotal = createSelector(
  selectPhaseState,
  fromPhase.selectPhaseTotal,
);
export const selectPhaseById = (phaseId: number) =>
  createSelector(
    selectPhaseState,
    (phaseState) => phaseState.entities[phaseId],
  );
export const selectPhaseByQuery = (query: (phase: Phase) => boolean) =>
  createSelector(selectPhaseState, (state) => {
    return Object.values(state.entities).find(
      (phase): phase is Phase => !!phase && query(phase),
    );
  });

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
