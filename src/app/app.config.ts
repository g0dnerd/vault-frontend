import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { appRoutes } from './app.routes';
import {
  AuthGuard,
  errorInterceptor,
  jwtInterceptor,
  RolesGuard,
} from './_helpers';
import { AuthEffects } from './_store/effects/auth.effects';
import { authReducer } from './_store/reducers/auth.reducer';
import { hydrationMetaReducer } from './_store/reducers/hydration.reducer';
import { dev } from '../environments/environment';
import { HydrationEffects } from './_store/effects/hydration.effects';
import { reducers } from './_store';

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
        subscriptSizing: 'fixed',
      },
    },
    AuthGuard,
    RolesGuard,
    provideStore(reducers, {
      metaReducers: [hydrationMetaReducer],
    }),
    provideEffects(HydrationEffects),
    provideEffects(AuthEffects),
    provideState({ name: 'auth', reducer: authReducer }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, errorInterceptor]),
    ),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideAnimationsAsync(),
  ],
};
