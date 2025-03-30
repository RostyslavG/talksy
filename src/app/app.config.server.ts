import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptorFactory } from './services/token.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptorFactory])),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
