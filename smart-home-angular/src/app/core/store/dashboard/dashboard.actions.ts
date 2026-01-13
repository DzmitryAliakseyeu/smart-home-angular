import { createAction, props } from "@ngrx/store";
import { DashboardInfo, TabI } from "../../models/dashboard.model";

export const copyDashboard = createAction(
  '[EditMode] Copy dashboard',
  props<{info: DashboardInfo, dashboardTabs: TabI[]}>()
)
