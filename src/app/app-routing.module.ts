import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserComponent } from './pages/user/user.component';
import { NotFound404Component } from './pages/results/not-found-404.component';
import { AdminComponent } from './pages/admin/admin.component';
import { Forbidden403Component } from './pages/results/forbidden-403.component';
import { ServerError500Component } from './pages/results/server-error-500.component';
import { BadConnectionComponent } from './pages/results/bad-connection.component';
import { CanAccessLoggedInGuard } from './guards/can-access-logged-in.guard';
import { CanNotAccessLoggedInGuard } from './guards/can-not-access-logged-in.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
    canActivate: [CanAccessLoggedInGuard, AdminGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user-routing.module').then(
        (m) => m.UserRoutingModule
      ),
    canActivate: [CanAccessLoggedInGuard, UserGuard],
  },
  {
    path: 'log-in',
    component: LogInComponent,
    canActivate: [CanNotAccessLoggedInGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [CanNotAccessLoggedInGuard],
  },
  {
    path: 'forbidden-403',
    component: Forbidden403Component,
  },
  {
    path: 'server-error-500',
    component: ServerError500Component,
  },
  {
    path: 'bad-connection',
    component: BadConnectionComponent,
  },
  {
    path: '**',
    component: NotFound404Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
