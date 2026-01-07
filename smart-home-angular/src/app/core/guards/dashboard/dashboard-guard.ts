import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorage } from '../../services/token-storage/token-storage';
import { AuthService } from '../../services/auth-service/auth-service';
import { firstValueFrom } from 'rxjs';
import { Dashboards } from '../../services/dashboards/dashboards';
import { Routes } from '../../models/routes.model';


export const dashboardGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const tokenStorage = inject(TokenStorage);
  const auth = inject(AuthService);
  const managerDashboards = inject(Dashboards);
  const token = tokenStorage.getToken();

  if (!token) {
    return router.parseUrl(Routes.Login);
  }

  try {
    let userData = await firstValueFrom(auth.getProfile());

    auth.userData.set(userData);
  } catch {
    tokenStorage.clearToken();
    return router.parseUrl('login');
  }

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

  const dashboard = dashboards.find((d) => d.id === dashboardId);
  if (!dashboard) {
    return router.parseUrl(Routes.NonFound);
  }

  const dashboardTabs = await firstValueFrom(managerDashboards.getDashboardTabs(dashboardId));
  const tab = dashboardTabs.tabs.find((t) => t.id === tabId);

  if (!tab) {
    return router.parseUrl(Routes.NonFound);
  }

  return true;
};
