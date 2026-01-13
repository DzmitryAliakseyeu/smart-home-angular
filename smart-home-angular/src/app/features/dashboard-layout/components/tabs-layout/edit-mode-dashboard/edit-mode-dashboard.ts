import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';


import { AppState } from '../../../../../state/app-state';
import { exitEditMode } from '../../../../../core/store/edit-mode/edit-mode.actions';
import { MatIcon } from "@angular/material/icon";


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
  currentDashboardData = this.appState.getCurrentDashboardData()?.[0]


  discard(){
    this.store.dispatch(exitEditMode())
  }
}
