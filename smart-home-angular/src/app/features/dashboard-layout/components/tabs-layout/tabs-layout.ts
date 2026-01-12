import { Component, computed, inject } from '@angular/core';
import { AppState } from '../../../../state/app-state';
import { Dashboards } from '../../../../core/services/dashboards/dashboards';
import { ManagmentDashboard } from "./managment-dashboard/managment-dashboard";
import { EditModeDashboard } from "./edit-mode-dashboard/edit-mode-dashboard";
import { Store } from '@ngrx/store';
import { iseSelectEditModeOpen } from '../../../../core/store/edit-mode/edit-mode.selectors';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [ManagmentDashboard, EditModeDashboard],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards);
  // isEditModeOpen = computed(()=>this.appState.isEditModeOpen());

    store = inject(Store)

  isEditModeOpen = this.store.selectSignal(iseSelectEditModeOpen);



  dashboardId= this.appState.selectedDashboardSwitcherIdSignal();


  tabs = computed(() => this.appState.currentTabsSignal());

  updateTabId(id: string) {
    this.appState.isChangedTab.set(true);
    this.appState.setNewSelectedTabId(id);
  }
}
