import { HttpInterceptorFn } from '@angular/common/http';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    const urlUpd = req.clone({
      url: `http://localhost:3004/api${req.url}`,
    });
    return next(urlUpd);
  }
  return next(req);
};
