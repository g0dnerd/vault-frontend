import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { Cube, Draft, Enrollment, Image, Role, Tournament } from '../_types';
import * as fromCube from './reducers/cube.reducer';
import * as fromEnrollment from './reducers/enrollment.reducer';
import * as fromImage from './reducers/image.reducer';
import * as fromTournament from './reducers/tournament.reducer';
import { AuthState } from './reducers/auth.reducer';
import { DraftState } from './reducers/draft.reducer';
import { MatchState } from './reducers/match.reducer';
import { PlayerState } from './reducers/player.reducer';
import { StandingsState } from './reducers/standings.reducer';

export interface State {
  images: fromImage.ImageState;
  tournaments: fromTournament.TournamentState;
}

export const reducers: ActionReducerMap<State> = {
  images: fromImage.imageReducer,
  tournaments: fromTournament.tournamentReducer,
};

// MATCHES
export interface MatchAppState {
  matches: MatchState;
}
export const selectMatches = (state: MatchAppState) => state.matches;
export const selectCurrentMatch = createSelector(
  selectMatches,
  (state: MatchState) => state.current,
);
export const selectOngoingMatches = createSelector(
  selectMatches,
  (state: MatchState) => state.ongoing,
);

// PLAYERS
export interface PlayerAppState {
  players: PlayerState;
}
export const selectPlayers = (state: PlayerAppState) => state.players;
export const selectCurrentPoolStatus = createSelector(
  selectPlayers,
  (state: PlayerState) => state.status,
);

// TOURNAMENTS
export const selectTournamentState =
  createFeatureSelector<fromTournament.TournamentState>('tournaments');
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
export const selectAvailableLeagues = createSelector(
  selectTournamentEntities,
  selectAvailableTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament =>
          tournament !== undefined && tournament.isLeague,
      ),
);
export const selectEnrolledLeagues = createSelector(
  selectTournamentEntities,
  selectEnrolledTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament =>
          tournament !== undefined && tournament.isLeague,
      ),
);

// IMAGES
export const selectImageState =
  createFeatureSelector<fromImage.ImageState>('images');
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
export const selectAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.roles.includes(Role.Admin),
);
export const selectPlayerAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.roles.includes(Role.PlayerAdmin),
);
export const selectErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage,
);

// DRAFTS
export interface DraftAppState {
  drafts: DraftState;
}
export const selectDrafts = (state: DraftAppState) => state.drafts;
export const selectOngoingDrafts = createSelector(
  selectDrafts,
  (state: DraftState) => state.ongoing,
);
export const selectCurrentDraft = createSelector(
  selectDrafts,
  (state: DraftState) => state.current,
);
export const selectDraftById = (draftId: number) =>
  createSelector(selectOngoingDrafts, (ongoing: Draft[]) => {
    return ongoing.find((draft): draft is Draft => draft.id == draftId);
  });

// ENROLLMENTS
export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.EnrollmentState>('enrollments');
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
export const selectEnrollmentByQuery = (
  query: (enrollment: Enrollment) => boolean,
) =>
  createSelector(selectEnrollmentState, (state) => {
    return Object.values(state.entities).find(
      (enrollment): enrollment is Enrollment =>
        !!enrollment && query(enrollment),
    );
  });
export const selectLeaguePlayerIds = createSelector(
  selectEnrollmentState,
  fromEnrollment.getLeaguePlayerIds,
);
export const selectLeaguePlayers = (tournamentId: number) =>
  createSelector(
    selectEnrollmentEntities,
    selectEnrollmentIds,
    (enrollments, ids) =>
      ids
        .map((id) => enrollments[id])
        .filter(
          (enrollment): enrollment is Enrollment =>
            enrollment !== undefined && enrollment.tournamentId == tournamentId,
        ),
  );

// CUBES
export const selectCubeState =
  createFeatureSelector<fromCube.CubeState>('cubes');
export const selectcubeIds = createSelector(
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
export interface StandingsAppState {
  standings: StandingsState;
}
export const selectStandings = (state: StandingsAppState) => state.standings;
export const selectTournamentStandings = createSelector(
  selectStandings,
  (state: StandingsState) => state.tournamentStandings,
);
