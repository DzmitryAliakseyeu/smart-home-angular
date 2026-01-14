import { createAction, props } from '@ngrx/store';
import { DashboardInfo, TabI } from '../../models/dashboard.model';

export const copyDashboard = createAction(
  '[dashboard] Copy dashboard',
  props<{ info: DashboardInfo; dashboardTabs: TabI[] }>(),
);

export const getCopiedDashboard = createAction('[dashboard] Get Copied Dashboard');

export const getCopiedTabs = createAction('[dashboard] Get Copied Dashboard');

export const removeTab = createAction('[dashbaord] Remove Tab', props<{ tabId: string }>());
export const updateTabTitle = createAction(
  '[dashboard] Update Tab Title',
  props<{ tabId: string; newTitle: string }>(),
);
