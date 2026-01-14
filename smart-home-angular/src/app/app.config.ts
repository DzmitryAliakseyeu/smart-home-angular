import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { apiPrefixInterceptor } from './core/interceptors/api-prefix/api-prefix-interceptor';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EditModeReducer } from './core/store/edit-mode/edit-mode.reducer';
import { dashboardReducer } from './core/store/dashboard/dashboard.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor, apiPrefixInterceptor, errorInterceptor])),
    provideStore(),
    provideState('editMode', EditModeReducer),
    provideState('Dashboard', dashboardReducer),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
