import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { TokenStorage } from '../../services/token-storage/token-storage';

export const authGuardFn: CanMatchFn = (route, segments) => {
  const token = inject(TokenStorage).getToken();
  return !!token;
};
