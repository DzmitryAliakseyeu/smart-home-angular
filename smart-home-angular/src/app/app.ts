import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Layout } from './core/layout/layout';
import { windowWidthSignal } from './state/app.state';
import { AppState } from './state/app-state';
import { ModalAuthLayout } from './core/modal-auth-layout/modal-auth-layout';

@Component({
  selector: 'app-root',
  imports: [Layout, ModalAuthLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-home-angular');
  appState = inject(AppState);
  isUserAuth = computed(() => this.appState.isUserAuth())

  windowWidth = windowWidthSignal;

  @HostListener('window: resize')
  onResize() {
    this.appState.updateWindowWidthSignal(window.innerWidth);
    this.appState.isMobileSidebarOpen.set(false);
  }
}
