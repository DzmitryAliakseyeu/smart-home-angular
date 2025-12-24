import { Routes } from '@angular/router';
import { authGuardFn } from './core/guards/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canMatch: [authGuardFn],
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
  },

  {
    path: 'login',
    loadComponent: () => import('./core/modal-auth-layout/modal-auth-layout').then((m) => m.ModalAuthLayout),
  },
  { path: '**', redirectTo: 'login' },
];
