import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as CubeActions from '../actions/cube.actions';
import { CubeService } from '../../_services/cube.service';

export const initAllCubesEffect = createEffect(
  (actions$ = inject(Actions), cubeService = inject(CubeService)) => {
    return actions$.pipe(
      ofType(CubeActions.initializeAllCubes),
      mergeMap(() => {
        return cubeService.getAllCubes().pipe(
          map((cubes) => {
            return CubeActions.loadCubes({ cubes });
          }),
          catchError((error) => {
            return of(
              CubeActions.cubeStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
