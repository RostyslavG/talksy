import { HttpInterceptorFn } from "@angular/common/http";
import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable, from, throwError } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { inject } from "@angular/core";
import { UserAuthService } from "../services/user-auth.service";

export const tokenInterceptorFactory: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(UserAuthService);
  const token = authService.accessTokenValue;

  const clonedReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;

  return next(clonedReq).pipe(
    catchError((error) => {
     
      if (error.status === 401 && !authService.isRefreshingValue) {
        authService.setIsRefreshingValue(true);

        return from(authService.refreshNewToken()).pipe(
          switchMap((newToken) => {
            authService.setIsRefreshingValue(false);

          
            const updatedReq = clonedReq.clone({
              headers: clonedReq.headers.set('Authorization', `Bearer ${newToken.accessToken}`)
            });

            return next(updatedReq);
          }),
          catchError((refreshError: any) => {
            authService.setIsRefreshingValue(false);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};