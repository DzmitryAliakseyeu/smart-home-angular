import { createAction, props } from '@ngrx/store';
import { DashboardInfo, TabI } from '../../models/dashboard.model';

export const copyDashboard = createAction(
  '[Dashboard] Copy dashboard',
  props<{ info: DashboardInfo; dashboardTabs: TabI[] }>(),
);

export const getCopiedDashboard = createAction('[Dashboard] Get Copied Dashboard');

export const getCopiedTabs = createAction('[Dashboard] Get Copied Dashboard');
export const updateTabTitle = createAction(
  '[Dashboard] Update Tab Title',
  props<{ tabId: string; newTitle: string }>(),
);
