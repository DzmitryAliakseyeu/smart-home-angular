import { createAction } from "@ngrx/store";


export const openEditMode = createAction(
  '[EditMode] Open EditMode'
)

export const closeEditMode = createAction(
  '[EditMode] Close EditMode'
)
