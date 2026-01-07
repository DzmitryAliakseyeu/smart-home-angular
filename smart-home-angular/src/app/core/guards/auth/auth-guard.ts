import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorage } from '../../services/token-storage/token-storage';
import { AuthService } from '../../services/auth-service/auth-service';
import { Routes } from '../../models/routes.model';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
 const router = inject(Router);
  const tokenStorage = inject(TokenStorage);
  const auth = inject(AuthService);
  const token = tokenStorage.getToken();

  if (!token) {
    return router.parseUrl(Routes.Login);
  }

  try {
    let userData = await firstValueFrom(auth.getProfile());
    auth.userData.set(userData);
    return true;
  } catch {
    tokenStorage.clearToken();
    return router.parseUrl(Routes.Login);
  }
};
