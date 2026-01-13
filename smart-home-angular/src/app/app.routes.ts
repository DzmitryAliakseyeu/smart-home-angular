import { Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard/dashboard-guard';
import { loginGuard } from './core/guards/login/login-guard';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./core/modal-auth-layout/modal-auth-layout').then((c) => c.ModalAuthLayout),
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./core/layout/layout').then((c) => c.Layout),
    children: [
      {
        path: '',
        canActivate: [authGuard, dashboardGuard],
        loadComponent: () =>
          import('./features/dashboard-layout/dashboard-layout').then((c) => c.DashboardLayout),
      },
      {
        path: ':dashboardId',
        canActivate: [authGuard, dashboardGuard],
        loadComponent: () =>
          import('./features/dashboard-layout/dashboard-layout').then((c) => c.DashboardLayout),
      },
      {
        path: ':dashboardId/:tabId',
        canActivate: [authGuard, dashboardGuard],
        loadComponent: () =>
          import('./features/dashboard-layout/dashboard-layout').then((c) => c.DashboardLayout),
      },
    ],
  },

  {
    path: 'not-found',
    loadComponent: () => import('./core/not-found/not-found/not-found').then((c) => c.NotFound),
  },
  { path: '**', redirectTo: '/not-found' },
];
