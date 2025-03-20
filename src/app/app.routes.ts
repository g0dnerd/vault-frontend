import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthGuard } from './_helpers';
import * as cubeEffects from './_store/effects/cube.effects';
import * as userEffects from './_store/effects/user.effects';
import { cubeReducer } from './_store/reducers/cube.reducer';
import { userReducer } from './_store/reducers/user.reducer';
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
      provideEffects(userEffects),
      provideState('users', userReducer),
      provideState({ name: 'cubes', reducer: cubeReducer }),
      provideEffects(cubeEffects),
    ],
  },
  {
    path: 'account/login',
    component: LoginComponent,
  },
  {
    path: 'account/register',
    component: RegisterComponent,
  },
  {
    path: 'cubes',
    component: CubeListComponent,
    children: [
      {
        path: ':cubeId',
        component: CubeDetailComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./tournaments/tournaments.routes').then(
        (m) => m.TOURNAMENT_ROUTES,
      ),
  },
  { path: '**', redirectTo: '' },
];
