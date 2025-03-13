import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { AlertService, ImageService } from '../../_services';
import * as ImageActions from '../actions/image.actions';

export const imageStoreFailure = createEffect(
  (actions$ = inject(Actions), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(ImageActions.imageStoreFailure),
      tap(({ errorMessage }) => {
        alertService.error(errorMessage, true);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const initPlayerImages = createEffect(
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
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
