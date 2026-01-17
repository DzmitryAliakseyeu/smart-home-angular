import { Component, computed, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { selectCards } from '../../../../../../../../core/store/dashboard/dashboard.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../../../state/app-state';

@Component({
  selector: 'smart-home-input-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.scss'],
})
export class InputField {
  store = inject(Store);
  appState = inject(AppState)

  text = input('');
  type = input('');
  bunch = input('');
  control = input.required<FormControl>();
  autocomplete = 'off';
  disabled = 'disabled';

  selectedCardIdEditMode = this.appState.selectedCardIdEditMode()

  cards = this.store.selectSignal(selectCards);
  card = computed(()=> this.cards().find(card => card.id === this.selectedCardIdEditMode));



}
