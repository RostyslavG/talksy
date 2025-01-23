import { ApplicationConfig, APP_INITIALIZER  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { errorInterceptorFn } from './services/middleware/errorInterceptor';
import { JWT_OPTIONS,JwtHelperService  } from '@auth0/angular-jwt';
import { tokenInterceptorFactory } from './services/middleware/tokenInterceptor';
import { UserAuthService } from './services/user-auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptorFactory, errorInterceptorFn])),
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: {} },
    UserAuthService
  ]
};
