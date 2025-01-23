import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders, HttpHandlerFn, HttpInterceptorFn}  from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserAuthService } from '../user-auth.service';
import { JWTToken } from '../../model/dto/jwtToken';


export const tokenInterceptorFactory: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(UserAuthService);
    const token = authService.accessTokenValue;
    let headers = new HttpHeaders({ 'Accept': 'application/json' });
  
    if (token) {
      if (authService.isTokenExpired()) {
        if (!authService.isRefreshingValue) {
          authService.setIsRefreshingValue(true);
          return from(authService.refreshNewToken()).pipe(
            switchMap((newToken: JWTToken) => {
              authService.setIsRefreshingValue(false);
              headers = headers.set('Authorization', `Bearer ${newToken.accessToken}`);
              const cloned = req.clone({ headers });
              return next(cloned);
            }),
            catchError((error: HttpErrorResponse) => {
              authService.setIsRefreshingValue(false);
              return throwError(error);
            })
          );
        } else {
          return next(req); // Skip the request if the token is still being refreshed
        }
      } else {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
  
    const clonedReq = req.clone({ headers });
    return next(clonedReq);
};
