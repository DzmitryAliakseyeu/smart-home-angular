import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../../../../../core/store/edit-mode/edit-mode.selectors';
import { selectCards } from '../../../../../../core/store/dashboard/dashboard.selectors';
import { AppState } from '../../../../../../state/app-state';

@Component({
  selector: 'smart-home-edit-mode-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './edit-mode-card.html',
  styleUrls: ['./edit-mode-card.scss'],
})
export class EditModeCard {
  appState = inject(AppState)
  store = inject(Store)
  isEditModeOpen = this.store.selectSignal(isSelectEditModeOpen)
  cards = this.store.selectSignal(selectCards)
  cardId = input<string>();

  isAddCardModalOpen = this.appState.isAddCardModalOpen();
  index = computed(() => {
    const cards = this.cards();
    console.log(cards)
    return cards.findIndex(c => c.id === this.cardId());
  });

}
