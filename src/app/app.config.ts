import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { appRoutes } from './app.routes';
import {
  AuthGuard,
  errorInterceptor,
  jwtInterceptor,
  UnAuthGuard,
} from './_helpers';
import * as authEffects from './_store/effects/auth.effects';
import * as cubeEffects from './_store/effects/cube.effects';
import { authReducer } from './_store/reducers/auth.reducer';
import { cubeReducer } from './_store/reducers/cube.reducer';
import { dev } from '../environments/environment';

const config: SocketIoConfig = {
  url: dev.webSocketUrl,
  options: {
    transports: ['websocket'],
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    AuthGuard,
    UnAuthGuard,
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(authEffects),
    provideState({ name: 'cubes', reducer: cubeReducer }),
    provideEffects(cubeEffects),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, errorInterceptor])
    ),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideAnimationsAsync(),
  ],
};
