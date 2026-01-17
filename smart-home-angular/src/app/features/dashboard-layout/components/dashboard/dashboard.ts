import { Component, computed, inject } from '@angular/core';
import { Card } from './card/card';
import { AppState } from '../../../../state/app-state';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../../../core/store/edit-mode/edit-mode.selectors';
import { selectCards, selectTabs } from '../../../../core/store/dashboard/dashboard.selectors';

@Component({
  selector: 'smart-home-dashboard',
  standalone: true,
  imports: [Card],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  appState = inject(AppState);
  store = inject(Store);

  isEditModeOpen = this.store.selectSignal(isSelectEditModeOpen);

  selectedTabId = computed(() => this.appState.selectedTabIdSignal());
  editModeTabs = this.store.selectSignal(selectTabs);

  editModeCurrentTab = computed(() => {
    const tabs = this.editModeTabs();
    const id = this.selectedTabId();
    return tabs.find((tab) => tab.id === id);
  });

  // editModeState = computed(()=> {
  //   return this.store.selectSignal(isSelectEditModeOpen);
  // })

  // editModeCurrentCards = computed(() => {
  //   const tab = this.editModeCurrentTab();
  //   return tab ? tab.cards : [];
  // });

  editModeCurrentCards = this.store.selectSignal(selectCards);

  currentCards = computed(() => this.appState.currentCardsListSignal());

  addCard() {
    this.appState.isAddCardModalOpen.set(true);
  }
}
