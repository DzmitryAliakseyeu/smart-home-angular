import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TokenStorage } from '../token-storage/token-storage';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenApi = inject(TokenStorage)
  private apiUrl = "http://localhost:3004/api";

  isUserLogged = signal(false);

  login(username: string, password: string){
     const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

   const body = new HttpParams()
      .set('userName', username)
      .set('password', password);

  return this.http.post<{token: string}>(`${this.apiUrl}/user/login`,
    body.toString(),
    {headers})
    .pipe(
      tap(response => {
        this.tokenApi.saveToken(response.token)
      })
    );
  }
}
