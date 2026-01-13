import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AppState } from '../../../../state/app-state';
import { Dashboards } from '../../../../core/services/dashboards/dashboards';
import { ManagmentDashboard } from './managment-dashboard/managment-dashboard';
import { EditModeDashboard } from './edit-mode-dashboard/edit-mode-dashboard';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../../../core/store/edit-mode/edit-mode.selectors';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [ManagmentDashboard, EditModeDashboard, MatIcon],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards);
  // isEditModeOpen = computed(()=>this.appState.isEditModeOpen());
  editTabId = signal('');
  isInputEditTabActive = signal(false)
  @ViewChild('editInput') editInput!: ElementRef<HTMLInputElement>;

  store = inject(Store);

  isEditModeOpen = this.store.selectSignal(isSelectEditModeOpen);

  dashboardId = this.appState.selectedDashboardSwitcherIdSignal();

  tabs = computed(() => this.appState.currentTabsSignal());

  updateTabId(id: string) {
    this.editTabId.set('')
    this.appState.isChangedTab.set(true);
    this.appState.setNewSelectedTabId(id);
  }

  editDashboardTitle(event: Event){
    event.stopPropagation();

  }

  editTab(event: Event){
    const isEditTabId = this.editTabId()
    if(isEditTabId.length > 0){
      this.editTabId.set('');
      this.isInputEditTabActive.set(false)
    } else {
      this.editTabId.set(this.appState.selectedTabIdSignal());
      this.isInputEditTabActive.set(true)
      setTimeout(() => { this.editInput.nativeElement.focus(); });
    }

    event.stopPropagation()
  }
}
