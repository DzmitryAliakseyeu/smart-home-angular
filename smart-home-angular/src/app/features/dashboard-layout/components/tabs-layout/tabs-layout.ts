import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AppState } from '../../../../state/app-state';
import { Dashboards } from '../../../../core/services/dashboards/dashboards';
import { ManagmentDashboard } from './managment-dashboard/managment-dashboard';
import { EditModeDashboard } from './edit-mode-dashboard/edit-mode-dashboard';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../../../core/store/edit-mode/edit-mode.selectors';
import { MatIcon } from '@angular/material/icon';
import { updateTabTitle } from '../../../../core/store/dashboard/dashboard.actions';
import { selectDashboard, selectTabs } from '../../../../core/store/dashboard/dashboard.selectors';
import { EditModeTabs } from './edit-mode-tabs/edit-mode-tabs';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [ManagmentDashboard, EditModeDashboard, EditModeTabs],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards);
  store = inject(Store);

  isEditModeOpen = this.store.selectSignal(isSelectEditModeOpen);

  dashboardId = this.appState.selectedDashboardSwitcherIdSignal();

  tabs = computed(() => this.appState.currentTabsSignal());

  copiedTabs = this.store.selectSignal(selectTabs);

  updateTabId(id: string) {
    // this.editTabId.set('')
    this.appState.isChangedTab.set(true);
    this.appState.setNewSelectedTabId(id);
  }

  editDashboardTitle(event: Event) {
    event.stopPropagation();
  }
}
