import { Component, computed, inject } from '@angular/core';
import { Card } from './card/card';
import { AppState } from '../../../../state/app-state';

@Component({
  selector: 'smart-home-dashboard',
  standalone: true,
  imports: [Card],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  appState = inject(AppState);
  currentCards = computed(() => this.appState.currentCardsListSignal());
}
