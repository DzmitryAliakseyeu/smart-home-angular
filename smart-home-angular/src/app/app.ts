import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Layout } from './core/layout/layout';
import { windowWidthSignal } from './state/app.state';
import { AppState } from './state/app-state';
import { ModalAuthLayout } from './core/modal-auth-layout/modal-auth-layout';
import { Router, RouterOutlet } from '@angular/router';
import { TokenStorage } from './core/services/token-storage/token-storage';
import { AuthService } from './core/services/auth-service/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('smart-home-angular');
  appState = inject(AppState);
  token = inject(TokenStorage);
  auth = inject(AuthService);
  router = inject(Router)
  isUserAuth = computed(() => this.auth.isUserLogged());


  windowWidth = windowWidthSignal;

  @HostListener('window: resize')
  onResize() {
    this.appState.updateWindowWidthSignal(window.innerWidth);
    this.appState.isMobileSidebarOpen.set(false);
  }

  ngOnInit(){
    const token = this.token.getToken();
    if(token){
      this.auth.getProfile().subscribe({
        next: (res)=> {
          const userData = structuredClone(res);
          this.auth.userData.set(userData);
          this.auth.isUserLogged.set(true);

          if (!this.router.url.startsWith('/dashboard')) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (res)=> {
          if(res.status === 401){
            this.token.clearToken();
            this.auth.isUserLogged.set(false);
            if (!this.router.url.startsWith('/login')) {
              this.router.navigate(['/login']);
            }
          }
        }
      })
    } else {
      this.auth.isUserLogged.set(false);
      return;
    }
  }
}
