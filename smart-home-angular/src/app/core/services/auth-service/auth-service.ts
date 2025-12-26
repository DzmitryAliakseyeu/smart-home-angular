import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TokenStorage } from '../token-storage/token-storage';
import { Observable, tap } from 'rxjs';
import { UserData } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenApi = inject(TokenStorage);

  isUserLogged = signal(false);
  userData = signal<UserData>({fullName: '', initials: ''});

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams().set('userName', username).set('password', password);

    return this.http.post<{ token: string }>(`/user/login`, body.toString(), { headers }).pipe(
      tap((response) => {
        this.tokenApi.saveToken(response.token);
      }),
    );
  }

  getProfile(): Observable<UserData>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.get<UserData>('/user/profile', { headers })
  }
}
