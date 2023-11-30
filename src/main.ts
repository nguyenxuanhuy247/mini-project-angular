import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsIcons } from '@ui-vts/icons-angular/icons';
import { AntdIcons } from '@ui-vts/icons-angular/icons';
import { BootstrapIcons } from '@ui-vts/icons-angular/icons';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsThemeModule } from '@ui-vts/theme/services';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VtsToastService } from '@ui-vts/ng-vts/toast';
import { Overlay } from '@angular/cdk/overlay';
import { AdminRoutingModule } from './app/pages/admin/admin-routing.module';
import { AuthInterceptorService } from './app/services/auth-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      AppRoutingModule,
      AdminRoutingModule,
      VtsIconModule.forRoot([
        ...Object.values(VtsIcons),
        ...Object.values(AntdIcons),
        ...Object.values(BootstrapIcons),
      ]),
      VtsButtonModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      VtsThemeModule.forRoot({
        themes: [
          {
            theme: 'dark',
            url: '/assets/themes/theme-dark.css',
          },
          {
            theme: 'default',
            url: '/assets/themes/theme-default.css',
          },
        ],
        defaultTheme: 'default',
      })
    ),
    VtsToastService,
    Overlay,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
});
