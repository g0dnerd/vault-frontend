import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthGuard, RolesGuard } from './_helpers';
import { CubesEffects } from './_store/effects/cubes.effects';
import { UsersEffects } from './_store/effects/users.effects';
import { cubesReducer } from './_store/reducers/cubes.reducer';
import { usersReducer } from './_store/reducers/users.reducer';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Profile } from './account/profile/profile';
import { EditProfile } from './account/edit-profile/edit-profile';
import { Home } from './home/home';
import { CubeList } from './cubes/cube-list/cube-list';
import { CubeDetail } from './cubes/cube-detail/cube-detail';
import { CreateCube } from './cubes/create-cube/create-cube';
import { Role } from './_types';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Home,
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
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
  {
    path: 'cubes',
    children: [
      {
        path: '',
        component: CubeList,
      },
      {
        path: 'create',
        component: CreateCube,
        data: { requiredRoles: [Role.Admin, Role.PlayerAdmin] },
        canActivate: [RolesGuard],
      },
      {
        path: ':cubeId',
        component: CubeDetail,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: Profile,
      },
      {
        path: 'edit',
        component: EditProfile,
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
