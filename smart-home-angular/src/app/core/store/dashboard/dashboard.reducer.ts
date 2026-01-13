import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { DashboardI, DashboardInfo, TabI } from '../../models/dashboard.model';

export interface DashboardState {
  dashboard: DashboardI;
}

const initialState: DashboardState = {
  dashboard: {
    id: '',
    title: '',
    icon: '',
    tabs: [],
  },
};

export const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.copyDashboard, (state, { info, dashboardTabs }) => ({
    ...state,
    dashboard: {
      ...info,
      tabs: structuredClone(dashboardTabs),
    },
  })),
);
