import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { baseUrlInterceptor } from './interceptors/base-url-interceptor';
import { headersInterceptor } from './interceptors/headers-interceptor';
import { unauthorizedInterceptor } from './interceptors/unauthorized-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        baseUrlInterceptor, 
        headersInterceptor,
        unauthorizedInterceptor,
      ])
    )

  ]
};