import { Component } from '@angular/core';
import { Sidebar } from "../../features/sidebar/sidebar";
import { isMobileViewportSignal } from '../../state/app.state';
import { DashboardLayout } from "../../features/dashboard-layout/dashboard-layout";

@Component({
  selector: 'smart-home-layout',
  standalone: true,
  imports: [Sidebar, DashboardLayout],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {

  isMobileViewport = isMobileViewportSignal
}
