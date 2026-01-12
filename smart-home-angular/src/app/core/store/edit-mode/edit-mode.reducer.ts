import { createReducer, on } from '@ngrx/store';
import * as EditModeActions from './edit-mode.actions';
import { DashboardI } from '../../models/dashboard.model';

export interface EditModeState {
  dashboard: DashboardI
  isOpen: boolean
}

export const initialState: EditModeState = {
  dashboard: {
    id: '',
    title: '',
    icon: '',
    tabs: [],
  },

  isOpen: false
}

export const EditModeReducer = createReducer(
  initialState,
  on(EditModeActions.openEditMode, (state)=>({
    ...state,
    isOpen: true
  })),
  on(EditModeActions.closeEditMode, (state)=> ({
    ...state,
    isOpen:false
  })),
  on(EditModeActions.copyDashboard, (state, {info, dashboardTabs})=> ({
    ...state,
    dashboard: {
      ...info,
      tabs: structuredClone(dashboardTabs)
    },
    isOpen: true
  }))

)

