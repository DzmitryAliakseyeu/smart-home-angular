import { Component, inject } from '@angular/core';
import { AppState } from '../../../../state/app-state';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  appState = inject(AppState);
}
