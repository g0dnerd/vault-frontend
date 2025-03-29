import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthGuard } from './_helpers';
import { CubesEffects } from './_store/effects/cubes.effects';
import { UsersEffects } from './_store/effects/users.effects';
import { cubesReducer } from './_store/reducers/cubes.reducer';
import { usersReducer } from './_store/reducers/users.reducer';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './account/profile/profile.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { CubeListComponent } from './cubes/cube-list/cube-list.component';
import { CubeDetailComponent } from './cubes/cube-detail/cube-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    providers: [
      provideEffects(CubesEffects, UsersEffects),
      provideState({ name: 'users', reducer: usersReducer }),
      provideState({ name: 'cubes', reducer: cubesReducer }),
    ],
  },
  {
    path: 'account',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'cubes',
    children: [
      {
        path: '',
        component: CubeListComponent,
      },
      {
        path: ':cubeId',
        component: CubeDetailComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./tournaments/tournaments.routes').then(
        (m) => m.TOURNAMENT_ROUTES,
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
