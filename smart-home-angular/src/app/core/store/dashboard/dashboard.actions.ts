import { createAction, props } from '@ngrx/store';
import { DashboardInfo, TabI } from '../../models/dashboard.model';

export const copyDashboard = createAction(
  '[dashboard] Copy dashboard',
  props<{ info: DashboardInfo; dashboardTabs: TabI[] }>(),
);

export const getCopiedDashboard = createAction('[dashboard] Get Copied Dashboard');

export const getCopiedTabs = createAction('[dashboard] Get Copied Tabs');

export const setCurrentTabId = createAction('[dashboard] set current tab id', props<{tabId: string}>())

export const addTab = createAction('[dashboard] Create new tab', props<{ title: string }>());

export const removeTab = createAction('[dashbaord] Remove Tab', props<{ tabId: string }>());

export const addCard = createAction('[dashboard] Create new card', props<{ tabId: string, layout: string }>());

export const increaseTabOrder = createAction(
  '[dashbaord] Increase Tab Order',
  props<{ tabId: string }>(),
);
export const decreaseTabOrder = createAction(
  '[dashbaord] Decrease Tab Order',
  props<{ tabId: string }>(),
);
export const updateTabTitle = createAction(
  '[dashboard] Update Tab Title',
  props<{ tabId: string; newTitle: string }>(),
);


export const increaseCardOrder = createAction(
  '[dashbaord] Increase Card  Order',
  props<{ cardId: string }>(),
);
export const decreaseCardOrder = createAction(
  '[dashbaord] Decrease Card Order',
  props<{ cardId: string }>(),
);
