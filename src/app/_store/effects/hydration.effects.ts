import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';

import * as HydrationActions from '../actions/hydration.actions';
import { State } from '..';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<State>);

  hydrate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(HydrationActions.hydrate),
        map(() => {
          const storageValue = localStorage.getItem('state');
          if (storageValue) {
            try {
              const state = JSON.parse(storageValue);
              return HydrationActions.hydrateSuccess({ state });
            } catch {
              localStorage.removeItem('state');
            }
          }
          return HydrationActions.hydrateFailure();
        }),
      );
    },
    { dispatch: true },
  );

  serialize$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          HydrationActions.hydrateSuccess,
          HydrationActions.hydrateFailure,
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => localStorage.setItem('state', JSON.stringify(state))),
      );
    },
    { dispatch: false },
  );

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}
