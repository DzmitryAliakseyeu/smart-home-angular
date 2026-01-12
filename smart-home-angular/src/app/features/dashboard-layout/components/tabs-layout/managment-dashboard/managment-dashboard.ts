import { Component, computed, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { AppState } from '../../../../../state/app-state';
import { Store } from '@ngrx/store';

import { openEditMode } from '../../../../../core/store/edit-mode/edit-mode.actions';
import { Dashboards } from '../../../../../core/services/dashboards/dashboards';
import { isSelectEditModeOpen } from '../../../../../core/store/edit-mode/edit-mode.selectors';

@Component({
  selector: 'smart-home-managment-dashboard',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './managment-dashboard.html',
  styleUrls: ['./managment-dashboard.scss'],
})
export class ManagmentDashboard {
  appState = inject(AppState);
  // isEditModeOpen = computed(()=>this.appState.isEditModeOpen())

    store = inject(Store);
    managerDashboards = inject(Dashboards)

  isEditModeOpen = this.store.selectSignal(isSelectEditModeOpen)


  manageEditMode(){
    this.store.dispatch(openEditMode());
    const data = this.appState.getCurrentDashboardData
    console.log(data)
    // this.appState.isEditModeOpen.set(!this.isEditModeOpen())
  }

  removeDashboard(){
    const dashboardId = this.appState.selectedDashboardSwitcherIdSignal()
    this.managerDashboards.deleteDashboard(dashboardId).subscribe({
      next: ()=> {
        this.appState.isDeleteDashboard.set(true)
        this.managerDashboards.getDashboards().subscribe({
          next: (dashboards) => {
            this.appState.dashboards.set(dashboards)
            const firstDashboard = dashboards[0];
            this.appState.setNewSelectedDashboardSwitcherId(firstDashboard.id);
            this.appState.isChangedDashboard.set(true)
          }
        })
      },
      error: (error) => console.log(error)
    }
    )
    console.log('remove dashboard')
  }

}
