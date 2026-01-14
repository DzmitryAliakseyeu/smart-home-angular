import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AppState } from '../../../../../state/app-state';
import { Store } from '@ngrx/store';
import {
  selectDashboard,
  selectTabs,
} from '../../../../../core/store/dashboard/dashboard.selectors';
import { MatIcon } from '@angular/material/icon';
import { updateTabTitle } from '../../../../../core/store/dashboard/dashboard.actions';

@Component({
  selector: 'smart-home-edit-mode-tabs',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './edit-mode-tabs.html',
  styleUrls: ['./edit-mode-tabs.scss'],
})
export class EditModeTabs {
  appState = inject(AppState);
  store = inject(Store);

  tabs = this.store.selectSignal(selectTabs);
  editTabId = signal('');

  isInputEditTabActive = signal(false);
  dashboard = this.store.selectSignal(selectDashboard);
  @ViewChild('editInput') editInput!: ElementRef<HTMLInputElement>;

  updateTabId(id: string) {
    this.editTabId.set('');
    this.appState.isChangedTab.set(true);
    this.appState.setNewSelectedTabId(id);
  }

  editTab(event: Event) {
    const isEditTabId = this.editTabId();
    if (isEditTabId.length > 0) {
      this.editTabId.set('');
      this.isInputEditTabActive.set(false);
    } else {
      this.editTabId.set(this.appState.selectedTabIdSignal());
      this.isInputEditTabActive.set(true);
      setTimeout(() => {
        this.editInput.nativeElement.focus();
      });
      console.log(this.dashboard());
    }

    event.stopPropagation();
  }

  saveUpdatedTab(tabId: string) {
    console.log(tabId);
    const newTitle = this.editInput.nativeElement.value;
    console.log(newTitle);
    this.store.dispatch(updateTabTitle({ tabId, newTitle }));
    console.log(this.dashboard());
    this.isInputEditTabActive.set(false);
  }

  addNewTab() {}
}
