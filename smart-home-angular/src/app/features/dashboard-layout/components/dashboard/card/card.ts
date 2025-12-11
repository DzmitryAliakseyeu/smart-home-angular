import { Component, inject, input } from '@angular/core';
import { AppState } from '../../../../../state/app-state';
import { CardI } from '../../../../../core/models/dashboard.model';

@Component({
  selector: 'smart-home-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class Card {
  appState = inject(AppState);
  card = input.required<CardI>();
}
