import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as CubesActions from '../actions/cubes.actions';
import { CubesService } from '../../_services/cubes.service';

@Injectable()
export class CubesEffects {
  private readonly actions$ = inject(Actions);
  private readonly cubesService = inject(CubesService);

  initializeCubes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CubesActions.initializeCubes),
        mergeMap(() => {
          return this.cubesService.get().pipe(
            map((cubes) => {
              return CubesActions.loadCubes({ cubes });
            }),
            catchError((error) => {
              return of(
                CubesActions.cubeStoreFailure({
                  errorMessage: error.message,
                }),
              );
            }),
          );
        }),
      );
    },
    { dispatch: true },
  );
}
