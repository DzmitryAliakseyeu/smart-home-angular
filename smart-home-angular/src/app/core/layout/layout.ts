import { Component, computed, inject } from '@angular/core';
import { Sidebar } from '../../features/sidebar/sidebar';
import { DashboardLayout } from '../../features/dashboard-layout/dashboard-layout';
import { AppState } from '../../state/app-state';
import { ActivatedRoute } from '@angular/router';
import { AddDashboardModalLayout } from '../../features/add-dashboard-modal-layout/add-dashboard-modal-layout';
import { AddNewTabModalLayout } from '../../features/dashboard-layout/components/tabs-layout/edit-mode-tabs/add-new-tab-modal-layout/add-new-tab-modal-layout';
import { AddCardModalLayout } from '../../features/dashboard-layout/components/dashboard/add-card-modal-layout/add-card-modal-layout';
import { ModificationCardModalLayout } from '../../features/dashboard-layout/components/dashboard/card/modification-card-modal-layout/modification-card-modal-layout';

@Component({
  selector: 'smart-home-layout',
  standalone: true,
  imports: [
    Sidebar,
    DashboardLayout,
    AddDashboardModalLayout,
    AddNewTabModalLayout,
    AddCardModalLayout,
    ModificationCardModalLayout,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  appState = inject(AppState);
  route = inject(ActivatedRoute);

  isAddDashboardModalOpen = computed(() => this.appState.isAddDashboardModalOpen());
  isAddTabModalOpen = computed(() => this.appState.isAddTabModalOpen());
  isAddCardModalOpen = computed(() => this.appState.isAddCardModalOpen());
  isModificationCardModalOpen = computed(() => this.appState.isModificationCardModalOpen());
}
