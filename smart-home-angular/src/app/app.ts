import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { AppState } from './state/app-state';
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
  router = inject(Router);
  isUserAuth = computed(() => this.auth.isUserLogged());

  windowWidth = this.appState.isMobileViewportSignal();

  @HostListener('window: resize')
  onResize() {
    this.appState.updateWindowWidthSignal(window.innerWidth);
    this.appState.isMobileSidebarOpen.set(false);
  }

}
