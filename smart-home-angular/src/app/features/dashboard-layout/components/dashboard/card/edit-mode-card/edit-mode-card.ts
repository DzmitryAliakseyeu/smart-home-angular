import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../../../../../core/store/edit-mode/edit-mode.selectors';
import { selectCards } from '../../../../../../core/store/dashboard/dashboard.selectors';
import { AppState } from '../../../../../../state/app-state';
import { decreaseCardOrder, increaseCardOrder } from '../../../../../../core/store/dashboard/dashboard.actions';

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
  isModificationCardModalOpen = this.appState.isModificationCardModalOpen();


  index = computed(() => {
    const cards = this.cards();
    return cards.findIndex(c => c.id === this.cardId());
  });

  increaseCardPosition(){
    const cards = this.cards();
    const cardId = cards[this.index()].id
    this.store.dispatch(increaseCardOrder({cardId}))
  }

  decreaseCardPosition(){
     const cards = this.cards();
    const cardId = cards[this.index()].id
    this.store.dispatch(decreaseCardOrder({cardId}))
  }

  openModificationCardModal(){
         const cards = this.cards();
    const cardId = cards[this.index()].id
    this.appState.selectedCardIdEditMode.set(cardId)
    console.log(this.appState.selectedCardIdEditMode())
    this.appState.isModificationCardModalOpen.set(!this.isModificationCardModalOpen)
  }


}
