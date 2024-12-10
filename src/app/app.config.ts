import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './Interceptor/error.interceptor';
import { authInterceptor } from './Interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideToastr(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),provideAnimations(),provideHttpClient(),provideHttpClient(withInterceptors([ errorInterceptor,authInterceptor]))]
};
