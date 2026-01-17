import { Component, computed, inject, input } from '@angular/core';

import { AppState } from '../../../../../../../state/app-state';
import { Dashboards } from '../../../../../../../core/services/dashboards/dashboards';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCards } from '../../../../../../../core/store/dashboard/dashboard.selectors';
import { InputField } from './input-field/input-field';
import { MatIcon } from '@angular/material/icon';
import { removeItemFromCard, saveUpdatedCardItem } from '../../../../../../../core/store/dashboard/dashboard.actions';

@Component({
  selector: 'smart-home-modification-card-modal',
  standalone: true,
  imports: [InputField, ReactiveFormsModule, MatIcon],
  templateUrl: './modification-card-modal.html',
  styleUrls: ['./modification-card-modal.scss'],
})
export class ModificationCardModal {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards);
  store = inject(Store);
  cards = this.store.selectSignal(selectCards);
  selectedCardIdEditMode = this.appState.selectedCardIdEditMode();
  currentCard = computed(()=>this.cards().find((card) => card.id === this.selectedCardIdEditMode));

  entities = computed(()=>this.currentCard()?.items);



  isModificationCardModalOpen = this.appState.isModificationCardModalOpen();

  modificationCardForm = new FormGroup({
    title: new FormControl(this.currentCard()?.title, {
      nonNullable: false,
      validators: [Validators.required, Validators.maxLength(30)],
    }),

    select: new FormControl('', {}),
  });

  closeModal() {
    this.appState.isModificationCardModalOpen.set(!this.isModificationCardModalOpen);
  }

  removeItem(itemId: string){

    const tabId = this.appState.selectedTabIdSignal();
    const cardId = this.currentCard()?.id ?? '';

    this.store.dispatch(removeItemFromCard({tabId: tabId, cardId: cardId, itemId:itemId}))
  }

  saveUpdatedCard(){
    const title = this.modificationCardForm.controls.title.value ?? '';
     const tabId = this.appState.selectedTabIdSignal();
    const cardId = this.currentCard()?.id ?? '';
     this.appState.isModificationCardModalOpen.set(!this.isModificationCardModalOpen);

    this.store.dispatch(saveUpdatedCardItem({ tabId: tabId, cardId: cardId, cardTitle: title, entities: this.entities() ?? [] }))
  }
}
