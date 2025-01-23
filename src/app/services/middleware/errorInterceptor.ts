import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorResponce } from '../../model/dto/errorResponce';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorResponce = new ErrorResponce(error.error.reason, error.error.message);
                return throwError(() => errorResponce);
            })
        );
    }
}

export const errorInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const errorInterceptor = new ErrorInterceptor();
    return errorInterceptor.intercept(req, { handle: next } as HttpHandler);
};
