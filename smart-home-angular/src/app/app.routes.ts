import { Routes } from '@angular/router';
import { authGuardFn } from './core/guards/auth-guard/auth-guard';
import { DashboardLayout } from './features/dashboard-layout/dashboard-layout';
import { Dashboard } from './features/dashboard-layout/components/dashboard/dashboard';
import { NotFound } from './core/not-found/not-found/not-found';

export const routes: Routes = [
  {
    path: 'dashboard',
    canMatch: [authGuardFn],
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: ':dashboardId/:tabId',
        loadComponent: () =>
          import('./features/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./core/modal-auth-layout/modal-auth-layout').then((m) => m.ModalAuthLayout),
  },
  { path: 'notFound', loadComponent: () => import('./core/not-found/not-found/not-found').then(m => m.NotFound), },
  { path: '**', redirectTo: 'notFound' },
];
