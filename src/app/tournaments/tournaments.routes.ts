import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { Role } from '../_types';
import { RolesGuard } from '../_helpers';
import * as draftEffects from '../_store/effects/draft.effects';
import * as enrollmentEffects from '../_store/effects/enrollment.effects';
import * as imageEffects from '../_store/effects/image.effects';
import * as matchEffects from '../_store/effects/match.effects';
import * as playerEffects from '../_store/effects/player.effects';
import * as standingsEffects from '../_store/effects/standings.effects';
import * as tournamentEffects from '../_store/effects/tournament.effects';
import { draftReducer } from '../_store/reducers/draft.reducer';
import { enrollmentReducer } from '../_store/reducers/enrollment.reducer';
import { imageReducer } from '../_store/reducers/image.reducer';
import { matchReducer } from '../_store/reducers/match.reducer';
import { playerReducer } from '../_store/reducers/player.reducer';
import { standingsReducer } from '../_store/reducers/standings.reducer';
import { tournamentReducer } from '../_store/reducers/tournament.reducer';

import { AvailableTournamentsComponent } from './available-tournaments/available-tournaments.component';
import { MyTournamentsComponent } from './my-tournaments/my-tournaments.component';
import { TournamentDashboardComponent } from './dashboard/tournament-dashboard.component';
import {
  AdminTournamentDashboardComponent,
  AdminDraftPanelComponent,
  CreateTournamentComponent,
  AdminTournamentListComponent,
} from '../admin';
import { LeagueDetailComponent } from './leagues/league-detail.component';
import { CreateDraftComponent } from '../admin/create-draft.component';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: MyTournamentsComponent,
    providers: [
      provideEffects(tournamentEffects),
      provideState('tournaments', tournamentReducer),
      provideEffects(draftEffects),
      provideState('drafts', draftReducer),
      provideEffects(enrollmentEffects),
      provideState('enrollments', enrollmentReducer),
      provideEffects(matchEffects),
      provideState('matches', matchReducer),
      provideEffects(imageEffects),
      provideState('images', imageReducer),
      provideEffects(playerEffects),
      provideState('players', playerReducer),
      provideEffects(standingsEffects),
      provideState('standings', standingsReducer),
    ],
  },
  {
    path: 'available',
    component: AvailableTournamentsComponent,
  },
  {
    path: 'admin',
    component: AdminTournamentListComponent,
    data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
    canActivate: [RolesGuard],
  },
  {
    path: 'admin/create',
    component: CreateTournamentComponent,
    data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
    canActivate: [RolesGuard],
  },
  {
    path: 'admin/draft/create/:tournamentId',
    component: CreateDraftComponent,
    data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
    canActivate: [RolesGuard],
  },
  {
    path: ':tournamentId',
    component: TournamentDashboardComponent,
  },
  {
    path: 'league/:leagueId',
    component: LeagueDetailComponent,
  },
  {
    path: 'admin/:tournamentId',
    component: AdminTournamentDashboardComponent,
    data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
    canActivate: [RolesGuard],
  },
  {
    path: 'admin/:tournamentId/draft/:draftId',
    component: AdminDraftPanelComponent,
    data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
    canActivate: [RolesGuard],
  },
];
