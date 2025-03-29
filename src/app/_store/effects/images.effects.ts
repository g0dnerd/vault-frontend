import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ImagesService } from '../../_services';
import * as ImagesActions from '../actions/images.actions';

@Injectable()
export class ImagesEffects {
  private readonly actions$ = inject(Actions);
  private readonly imagesService = inject(ImagesService);

  initializePlayerImages$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ImagesActions.initializePlayerImages),
        mergeMap(() => {
          return this.imagesService.getUserImages().pipe(
            map((images) => {
              return ImagesActions.loadImages({ images });
            }),
            catchError((error) => {
              return of(
                ImagesActions.imageStoreFailure({
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
