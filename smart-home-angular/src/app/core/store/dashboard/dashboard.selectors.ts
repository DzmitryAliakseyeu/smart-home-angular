import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('Dashboard');

export const selectDashboard = createSelector(selectDashboardState, (state) => state.dashboard);

export const selectTabs = createSelector(selectDashboardState, (state) => state.dashboard.tabs);
