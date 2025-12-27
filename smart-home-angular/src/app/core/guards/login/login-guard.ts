import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorage } from '../../services/token-storage/token-storage';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenStorage).getToken();
  const router = inject(Router)

  if(!!token) {
    return router.parseUrl('/dashboard')
  }
 return true;
};
