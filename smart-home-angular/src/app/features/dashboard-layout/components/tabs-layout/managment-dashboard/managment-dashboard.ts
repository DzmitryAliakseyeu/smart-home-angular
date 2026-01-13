import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppState } from '../../../../../state/app-state';
import { Store } from '@ngrx/store';

import { enterEditMode } from '../../../../../core/store/edit-mode/edit-mode.actions';
import { Dashboards } from '../../../../../core/services/dashboards/dashboards';
import { isSelectEditModeOpen } from '../../../../../core/store/edit-mode/edit-mode.selectors';
import { getCopiedDashboard } from '../../../../../core/store/dashboard/dashboard.selectors';
import { copyDashboard } from '../../../../../core/store/dashboard/dashboard.actions';

@Component({
  selector: 'smart-home-managment-dashboard',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './managment-dashboard.html',
  styleUrls: ['./managment-dashboard.scss'],
})
export class ManagmentDashboard {
  appState = inject(AppState);
  store = inject(Store);
  managerDashboards = inject(Dashboards);

  isEditModeOpen = this.store.selectSignal(isSelectEditModeOpen);

  manageEditMode() {
    this.store.dispatch(enterEditMode());
    const dashboardInfo = this.appState
      .dashboards()
      .filter((dashboard) => dashboard.id === this.appState.selectedDashboardSwitcherIdSignal())[0];

    this.managerDashboards
      .getDashboardTabs(this.appState.selectedDashboardSwitcherIdSignal())
      .subscribe({
        next: (dashboard) => {
          console.log(dashboard);
          this.store.dispatch(
            copyDashboard({
              info: { id: dashboardInfo.id, title: dashboardInfo.title, icon: dashboardInfo.icon },
              dashboardTabs: dashboard.tabs,
            }),
          );
        },
      });
  }

  removeDashboard() {
    const dashboardId = this.appState.selectedDashboardSwitcherIdSignal();
    this.managerDashboards.deleteDashboard(dashboardId).subscribe({
      next: () => {
        this.appState.isDeleteDashboard.set(true);
        this.managerDashboards.getDashboards().subscribe({
          next: (dashboards) => {
            this.appState.dashboards.set(dashboards);
            const firstDashboard = dashboards[0];
            this.appState.setNewSelectedDashboardSwitcherId(firstDashboard.id);
            this.appState.isChangedDashboard.set(true);
          },
        });
      },
      error: (error) => console.log(error),
    });
    console.log('remove dashboard');
  }
}
