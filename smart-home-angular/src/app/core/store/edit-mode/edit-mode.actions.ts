import { createAction, props } from "@ngrx/store";
import { DashboardI, DashboardInfo, TabI } from "../../models/dashboard.model";


export const openEditMode = createAction(
  '[EditMode] Open EditMode'
)

export const closeEditMode = createAction(
  '[EditMode] Close EditMode'
)

export const copyDashboard = createAction(
  '[EditMode] Copy dashboard',
  props<{info: DashboardInfo, dashboardTabs: TabI[]}>()
)
