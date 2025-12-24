import { Injectable } from '@angular/core';
import { TokenStorage } from '../token-storage/token-storage';
import { CanMatch } from '@angular/router';

//Analogue for authguardFn inside guard folder

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private tokenStorage: TokenStorage) {}

  canMatch(): boolean {
    const token = this.tokenStorage.getToken();
    console.log('GUARD TOKEN:', token);
   return !!token;
  }

}
