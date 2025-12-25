import { Component, computed, inject } from '@angular/core';
import { DashboardSwitcher } from './dashboard-switcher/dashboard-switcher';
import { AppState } from '../../../../state/app-state';
import { Dashboards } from '../../../../core/services/dashboards/dashboards';

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
  managerDashboards = inject(Dashboards);

  dashboards = computed(() => this.appState.dashboards());
  selectedDashboardSwitcherId = computed(()=>this.appState.selectedDashboardSwitcherIdSignal())

  manageDashboard(dashboardId: string) {
    console.log(dashboardId);
    this.appState.isChangedDashboard.set(true);
    this.appState.setNewSelectedDashboardSwitcherId(dashboardId);
    this.appState.isMobileSidebarOpen.set(false);

  }

  ngOnInit() {
    this.managerDashboards.getDashboards().subscribe({
      next: (res) => {
        this.appState.dashboards.set(res);
        const firstId = this.dashboards()?.[0].id
        this.appState.selectedDashboardSwitcherIdSignal.set(firstId);

        this.managerDashboards.getDashboardTabs(firstId).subscribe({
        next: (res)=> {
          this.appState.currentTabsSignal.set(res.tabs);
          const firstTabId =   this.appState.currentTabsSignal()[0].id
          this.appState.selectedTabIdSignal.set(firstTabId);
          const currentCards = this.appState.currentTabsSignal()[0].cards
          this.appState.currentCardsListSignal.set(currentCards);
          console.log(res.tabs)
        },
        error: (res)=>{
          console.log(res)
        }
      })

      },
      error: (res) => {
        console.log(res);
      },
    })

  }
}
