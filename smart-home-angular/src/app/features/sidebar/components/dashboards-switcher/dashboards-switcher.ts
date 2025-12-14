import { Component, inject, Input } from '@angular/core';
import { DashboardSwitcher } from './dashboard-switcher/dashboard-switcher';
import { selectedDashboardSwitcherSignal } from '../../../../state/app.state';
import { AppState } from '../../../../state/app-state';

export const dashboards = [
  {
    title: 'Overview',
    id: 'dsh-overview',
    iconPath: 'sidebar/dashboards-icons/four-squares.svg',
    iconPathActive: 'sidebar/dashboards-icons/four-squares-active.svg',
  },
  {
    title: 'About',
    id: 'dsh-about',
    iconPath: 'sidebar/dashboards-icons/about.svg',
    iconPathActive: 'sidebar/dashboards-icons/about-active.svg',
  },
];

@Component({
  selector: 'smart-home-dashboards-switcher',
  standalone: true,
  imports: [DashboardSwitcher],
  templateUrl: './dashboards-switcher.html',
  styleUrls: ['./dashboards-switcher.scss'],
})
export class DashboardsSwitcher {
  appState = inject(AppState);
  dashboards: { title: string; id: string; iconPath: string; iconPathActive: string }[] = dashboards;

  manageDashboard(dashboardId: string) {
    this.appState.setNewSelectedDashboardSwitcherId(dashboardId);
    this.appState.isMobileSidebarOpen.set(false);
  }
}
