import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AppState } from '../../../../../state/app-state';
import { Store } from '@ngrx/store';
import {
  selectDashboard,
  selectTabs,
} from '../../../../../core/store/dashboard/dashboard.selectors';
import { MatIcon } from '@angular/material/icon';
import {
  decreaseTabOrder,
  increaseTabOrder,
  removeTab,
  updateTabTitle,
} from '../../../../../core/store/dashboard/dashboard.actions';
import { CardI, TabI } from '../../../../../core/models/dashboard.model';
import { Router } from '@angular/router';
import { map, Observable, of, pipe, take, tap } from 'rxjs';

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
  router = inject(Router);

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
    }

    event.stopPropagation();
  }

  saveUpdatedTab(tabId: string) {
    const newTitle = this.editInput.nativeElement.value;

    this.store.dispatch(updateTabTitle({ tabId, newTitle }));

    this.isInputEditTabActive.set(false);
  }

  deleteTab(tabId: string) {
    this.store.dispatch(removeTab({ tabId }));
    setTimeout(() => {
      this.store
        .select(selectTabs)
        .pipe(take(1))
        .subscribe((tabs) => {
          this.isInputEditTabActive.set(false);
          this.editTabId.set('');
        });
    }, 100);
  }

  increaseTabPosition() {
    const tabId = this.appState.selectedTabIdSignal();
    this.store.dispatch(increaseTabOrder({ tabId }));
  }

  canMoveLeft = computed(() => {
    const tabId = this.appState.selectedTabIdSignal();
    const tabs = this.tabs();
    const index = tabs.findIndex((t) => t.id === tabId);
    return index > 0;
  });

  canMoveRight = computed(() => {
    const tabId = this.appState.selectedTabIdSignal();
    const tabs = this.tabs();
    const index = tabs.findIndex((t) => t.id === tabId);
    return index < tabs.length - 1;
  });

  decreaseTabPosition() {
    const tabId = this.appState.selectedTabIdSignal();
    this.store
      .select(selectTabs)
      .pipe(
        take(1),
        tap((tabs) => {
          let index = tabs.findIndex((tab) => tabId === tab.id);
          if (index > 0) {
            this.store.dispatch(decreaseTabOrder({ tabId }));
          }
        }),
      )
      .subscribe();
  }

  addNewTab() {}
}
