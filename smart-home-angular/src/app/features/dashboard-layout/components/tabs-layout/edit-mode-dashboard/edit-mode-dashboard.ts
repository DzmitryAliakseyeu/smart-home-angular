import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';


import { AppState } from '../../../../../state/app-state';
import { exitEditMode } from '../../../../../core/store/edit-mode/edit-mode.actions';
import { MatIcon } from "@angular/material/icon";
import { Dashboards } from '../../../../../core/services/dashboards/dashboards';
import { TabI } from '../../../../../core/models/dashboard.model';


@Component({
  selector: 'smart-home-edit-mode-dashboard',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './edit-mode-dashboard.html',
  styleUrls: ['./edit-mode-dashboard.scss'],
})
export class EditModeDashboard {
  store = inject(Store);
  appState = inject(AppState);
  managerDashboards = inject(Dashboards)
  currentDashboardData = this.appState.getCurrentDashboardData()?.[0];
  currentTabs = this.appState.currentTabsSignal();
  dashboardId = this.appState.selectedDashboardSwitcherIdSignal();


  discard(){
    this.store.dispatch(exitEditMode())
  }

  saveDashboard(){
    console.log('click')

    this.managerDashboards.putDashboard(this.dashboardId, this.currentTabs).subscribe();


    this.store.dispatch(exitEditMode())
  }
}
