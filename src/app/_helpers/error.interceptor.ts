import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) {
        console.error('A client-side error occurred:', err.error);
        return throwError(() => new Error(`${err.status}`));
      } else {
        console.error(
          `A server-side error occurred: ${err.status}, body was: `,
          err.error,
        );
        return throwError(() => err);
      }
    }),
  );
};
