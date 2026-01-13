import { createReducer, on } from '@ngrx/store';
import * as EditModeActions from './edit-mode.actions';
import { DashboardI } from '../../models/dashboard.model';

export interface EditModeState {
  isOpen: boolean
}

export const initialState: EditModeState = {
  isOpen: false
}

export const EditModeReducer = createReducer(
  initialState,
  on(EditModeActions.enterEditMode, (state)=>({
    ...state,
    isOpen: true
  })),
  on(EditModeActions.exitEditMode, (state)=> ({
    ...state,
    isOpen:false
  })),


)

