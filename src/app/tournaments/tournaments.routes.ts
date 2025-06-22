import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { RolesGuard } from '../_helpers';
import { DraftsEffects } from '../_store/effects/drafts.effects';
import { EnrollmentsEffects } from '../_store/effects/enrollments.effects';
import { ImagesEffects } from '../_store/effects/images.effects';
import { MatchesEffects } from '../_store/effects/matches.effects';
import { PhasesEffects } from '../_store/effects/phases.effects';
import { PlayersEffects } from '../_store/effects/players.effects';
import { StandingsEffects } from '../_store/effects/standings.effects';
import { TournamentsEffects } from '../_store/effects/tournaments.effects';
import { draftsReducer } from '../_store/reducers/drafts.reducer';
import { enrollmentsReducer } from '../_store/reducers/enrollments.reducer';
import { imagesReducer } from '../_store/reducers/images.reducer';
import { matchesReducer } from '../_store/reducers/matches.reducer';
import { phasesReducer } from '../_store/reducers/phases.reducer';
import { playersReducer } from '../_store/reducers/players.reducer';
import { standingsReducer } from '../_store/reducers/standings.reducer';
import { tournamentsReducer } from '../_store/reducers/tournaments.reducer';
import { Role } from '../_types';

import { AvailableTournaments } from './available-tournaments/available-tournaments';
import { MyTournaments } from './my-tournaments/my-tournaments';
import { TournamentDashboard } from './tournament-dashboard/tournament-dashboard';
import { AdminDraftPanel } from './admin/admin-draft-panel/admin-draft-panel';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { CreateDraft } from './admin/create-draft/create-draft';
import { CreateTournament } from './admin/create-tournament/create-tournament';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: MyTournaments,
    providers: [
      provideEffects(
        DraftsEffects,
        EnrollmentsEffects,
        ImagesEffects,
        MatchesEffects,
        PhasesEffects,
        PlayersEffects,
        StandingsEffects,
        TournamentsEffects,
      ),
      provideState('drafts', draftsReducer),
      provideState('enrollments', enrollmentsReducer),
      provideState('images', imagesReducer),
      provideState('matches', matchesReducer),
      provideState('phases', phasesReducer),
      provideState('players', playersReducer),
      provideState('standings', standingsReducer),
      provideState('tournaments', tournamentsReducer),
    ],
  },
  {
    path: 'available',
    component: AvailableTournaments,
  },
  {
    path: 'admin',
    children: [
      {
        path: 'create',
        component: CreateTournament,
        data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
        canActivate: [RolesGuard],
      },
      {
        path: ':tournamentId/draft',
        children: [
          {
            path: 'create',
            component: CreateDraft,
            canActivate: [RolesGuard],
            data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
          },
          {
            path: ':draftId',
            component: AdminDraftPanel,
            data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
            canActivate: [RolesGuard],
          },
        ],
      },
    ],
  },
  {
    path: ':tournamentId',
    component: TournamentDashboard,
  },
  {
    path: 'league/:leagueId',
    component: LeagueDetailComponent,
  },
];
