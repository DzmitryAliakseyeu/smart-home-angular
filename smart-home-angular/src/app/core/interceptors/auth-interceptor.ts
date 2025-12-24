import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorage } from '../services/token-storage/token-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenStorage).getToken();

  const reqUpd = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(reqUpd);
};
