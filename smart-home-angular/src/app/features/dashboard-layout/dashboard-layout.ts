import { Component } from '@angular/core';
import { TabsLayout } from "./components/tabs-layout/tabs-layout";
import { Dashboard } from "./components/dashboard/dashboard";

@Component({
  selector: 'smart-home-dashboard-layout',
  imports: [TabsLayout, Dashboard],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.scss'],
})
export class DashboardLayout {

}
