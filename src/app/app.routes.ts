import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthGuard, RolesGuard } from './_helpers';
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
import { CreateCubeComponent } from './cubes/create-cube/create-cube.component';
import { Role } from './_types';

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
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'account',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { breadcrumb: null },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { breadcrumb: null },
      },
    ],
  },
  {
    path: 'cubes',
    data: { breadcrumb: 'Cubes' },
    children: [
      {
        path: '',
        component: CubeListComponent,
        data: { breadcrumb: null },
      },
      {
        path: 'create',
        component: CreateCubeComponent,
        data: {
          requiredRoles: [Role.Admin, Role.PlayerAdmin],
          breadcrumb: 'Create',
        },
        canActivate: [RolesGuard],
      },
      {
        path: ':cubeId',
        data: { breadcrumb: 'Detail' },
        component: CubeDetailComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    data: { breadcrumb: 'Profile' },
    children: [
      {
        path: '',
        component: ProfileComponent,
        data: { breadcrumb: null },
      },
      {
        path: 'edit',
        data: { breadcrumb: 'Edit' },
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
    data: { breadcrumb: 'Tournaments' },
  },
  { path: '**', redirectTo: '' },
];
