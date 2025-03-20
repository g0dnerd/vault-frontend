import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ImageService } from '../../_services';
import * as ImageActions from '../actions/image.actions';

export const initializePlayerImages$ = createEffect(
  (actions$ = inject(Actions), imageService = inject(ImageService)) => {
    return actions$.pipe(
      ofType(ImageActions.initializePlayerImages),
      mergeMap(() => {
        return imageService.getUserImages().pipe(
          map((images) => {
            return ImageActions.loadImages({ images });
          }),
          catchError((error) => {
            return of(
              ImageActions.imageStoreFailure({
                errorMessage: error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true, dispatch: true },
);
