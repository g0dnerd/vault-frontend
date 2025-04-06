import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as CubesActions from '../actions/cubes.actions';
import { CubesService } from '../../_services/cubes.service';
import { HttpErrorResponse } from '@angular/common/http';

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
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error.message;
              return of(
                CubesActions.cubeStoreFailure({
                  errorMessage,
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
