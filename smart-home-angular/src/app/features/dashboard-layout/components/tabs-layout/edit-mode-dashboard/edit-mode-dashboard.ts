import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { closeEditMode } from '../../../../../core/store/edit-mode/edit-mode.actions';
import { AppState } from '../../../../../state/app-state';


@Component({
  selector: 'smart-home-edit-mode-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './edit-mode-dashboard.html',
  styleUrls: ['./edit-mode-dashboard.scss'],
})
export class EditModeDashboard {
  store = inject(Store);
  appState = inject(AppState);
  currentDashboardData = this.appState.getCurrentDashboardData()?.[0]


  discard(){
    this.store.dispatch(closeEditMode())
  }
}
