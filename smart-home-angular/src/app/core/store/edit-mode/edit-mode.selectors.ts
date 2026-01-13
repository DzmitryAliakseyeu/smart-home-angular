import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EditModeState } from "./edit-mode.reducer";


export const selectEditModeState = createFeatureSelector<EditModeState>('editMode')

export const isSelectEditModeOpen = createSelector(
  selectEditModeState,
  (state) => state.isOpen
)



