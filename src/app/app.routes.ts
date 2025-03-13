import { Route } from '@angular/router';

import { AuthGuard, UnAuthGuard } from './_helpers';
import { LoginComponent, RegisterComponent } from './account';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { CubeListComponent } from './cubes/cube-list.component';
import { CubeDetailComponent } from './cubes/cube-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/login',
    component: LoginComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'account/register',
    component: RegisterComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'cubes',
    component: CubeListComponent,
  },
  {
    path: 'cubes/:cubeId',
    component: CubeDetailComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./tournaments/tournaments.routes').then(
        (m) => m.TOURNAMENT_ROUTES
      ),
  },
  { path: '**', redirectTo: '' },
];
