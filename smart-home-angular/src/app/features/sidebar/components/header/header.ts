import { Component, inject } from '@angular/core';
import { isMobileViewportSignal } from '../../../../state/app.state';
import { AppState } from '../../../../state/app-state';

@Component({
  selector: 'smart-home-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  appState = inject(AppState);
  isMobileViewport = isMobileViewportSignal;
}
