import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectDashboard = createSelector(selectDashboardState, (state) => state.dashboard);

export const selectTabId = createSelector(selectDashboardState, (state)=> state.selectedTabId)

export const selectTabs = createSelector(selectDashboardState, (state) => state.dashboard.tabs);

export const selectCards = createSelector(selectTabs, selectTabId, (tabs, selectedTabId)=> {
  const tab = tabs.find((tab)=> tab.id === selectedTabId)
  return tab ? tab.cards : []
})


