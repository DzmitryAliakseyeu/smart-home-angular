import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Dashboards } from '../../services/dashboards/dashboards';
import { Routes } from '../../models/routes.model';
import { Store } from '@ngrx/store';
import { isSelectEditModeOpen } from '../../store/edit-mode/edit-mode.selectors';
import { selectDashboard, selectTabs } from '../../store/dashboard/dashboard.selectors';

export const dashboardGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const managerDashboards = inject(Dashboards);
  const store = inject(Store);

  const isEditModeOpen = store.selectSignal(isSelectEditModeOpen);

  const dashboards = await firstValueFrom(managerDashboards.getDashboards());

  if (!dashboards.length) {
    return router.parseUrl(Routes.Dashboard);
  }

  if (
    state.url === Routes.Dashboard ||
    (state.url.startsWith(Routes.Dashboard) && !route.params['dashboardId'])
  ) {
    const first = dashboards[0];
    const tabs = await firstValueFrom(managerDashboards.getDashboardTabs(first.id));
    const firstTab = tabs.tabs[0];
    return router.parseUrl(`${Routes.Dashboard}/${first.id}/${firstTab.id}`);
  }

  const dashboardId = route.params['dashboardId'];
  const tabId = route.params['tabId'];

  if (isEditModeOpen()) {
    const dashboard = store.selectSignal(selectDashboard);

    if (!dashboard) {
      return router.parseUrl(Routes.NonFound);
    }

    const dashboardTabs = store.selectSignal(selectTabs);
    if (dashboardTabs.length == 0) {
      return true;
    }

    const tab = dashboardTabs().find((t) => t.id === tabId);

    if (!tab) {
      router.parseUrl(`${Routes.Dashboard}/${dashboardId}`);
      return true;
    }
    return true;
  }

  const dashboard = dashboards.find((d) => d.id === dashboardId);
  if (!dashboard) {
    return router.parseUrl(Routes.NonFound);
  }

  const dashboardTabs = await firstValueFrom(managerDashboards.getDashboardTabs(dashboardId));
  if (dashboardTabs.tabs.length == 0) {
    return true;
  }
  const tab = dashboardTabs.tabs.find((t) => t.id === tabId);

  if (!tab) {
    router.parseUrl(`${Routes.Dashboard}/${dashboardId}`);
    return true;
  }

  return true;
};
