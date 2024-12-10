import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaderResponse, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe
  (catchError((error: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occured';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`
    } else {
      errorMessage = `Error Status: ${error.status}`;
    }
    alert(errorMessage);
    return throwError(() => new Error(errorMessage));
}));
}