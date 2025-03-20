import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { RolesGuard } from '../_helpers';
import * as draftEffects from '../_store/effects/draft.effects';
import * as enrollmentEffects from '../_store/effects/enrollment.effects';
import * as imageEffects from '../_store/effects/image.effects';
import * as matchEffects from '../_store/effects/match.effects';
import * as phaseEffects from '../_store/effects/phase.effects';
import * as playerEffects from '../_store/effects/player.effects';
import * as standingsEffects from '../_store/effects/standings.effects';
import * as tournamentEffects from '../_store/effects/tournament.effects';
import { draftReducer } from '../_store/reducers/draft.reducer';
import { enrollmentReducer } from '../_store/reducers/enrollment.reducer';
import { imageReducer } from '../_store/reducers/image.reducer';
import { matchReducer } from '../_store/reducers/match.reducer';
import { phaseReducer } from '../_store/reducers/phase.reducer';
import { playerReducer } from '../_store/reducers/player.reducer';
import { standingsReducer } from '../_store/reducers/standings.reducer';
import { tournamentReducer } from '../_store/reducers/tournament.reducer';
import { Role } from '../_types';

import { AvailableTournamentsComponent } from './available-tournaments/available-tournaments.component';
import { MyTournamentsComponent } from './my-tournaments/my-tournaments.component';
import { TournamentDashboardComponent } from './tournament-dashboard/tournament-dashboard.component';
import { AdminDraftPanelComponent } from './admin/admin-draft-panel/admin-draft-panel.component';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { CreateDraftComponent } from './admin/create-draft/create-draft.component';
import { CreateTournamentComponent } from './admin/create-tournament/create-tournament.component';

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
      provideEffects(phaseEffects),
      provideState('phases', phaseReducer),
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
    children: [
      {
        path: 'create',
        component: CreateTournamentComponent,
        data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
        canActivate: [RolesGuard],
      },
      {
        path: ':tournamentId/draft',
        children: [
          {
            path: ':draftId',
            component: AdminDraftPanelComponent,
            data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
            canActivate: [RolesGuard],
          },
          {
            path: 'create',
            component: CreateDraftComponent,
            canActivate: [RolesGuard],
            data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
          },
        ],
      },
    ],
  },
  {
    path: ':tournamentId',
    component: TournamentDashboardComponent,
  },
  {
    path: 'league/:leagueId',
    component: LeagueDetailComponent,
  },
];
