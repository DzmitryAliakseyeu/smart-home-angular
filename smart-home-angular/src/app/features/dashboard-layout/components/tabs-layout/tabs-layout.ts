import { Component, computed, inject } from '@angular/core';
import { AppState } from '../../../../state/app-state';
import { Dashboards } from '../../../../core/services/dashboards/dashboards';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards);

  tabs = computed(() => this.appState.currentTabsSignal());

  updateTabId(id: string) {
    this.appState.isChangedTab.set(true);
    this.appState.setNewSelectedTabId(id);
  }
}
