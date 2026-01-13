import { createAction, props } from "@ngrx/store";
import { DashboardI, DashboardInfo, TabI } from "../../models/dashboard.model";


export const enterEditMode = createAction(
  '[EditMode] Enter EditMode'
)

export const exitEditMode = createAction(
  '[EditMode] Exit EditMode'
)


