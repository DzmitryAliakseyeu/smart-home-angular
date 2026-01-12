import { createReducer, on } from '@ngrx/store';
import * as EditModeActions from './edit-mode.actions';

export interface EditModeState {
  isOpen: boolean
}

export const initialState: EditModeState = {
  isOpen: false
}

export const EditModeReducer = createReducer(
  initialState,
  on(EditModeActions.openEditMode, (state)=>({
    ...state,
    isOpen: true
  })
  ),
  on(EditModeActions.closeEditMode, (state)=> ({
    ...state,
    isOpen:false
  }))
)

