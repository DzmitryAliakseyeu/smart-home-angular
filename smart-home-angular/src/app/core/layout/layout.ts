import { Component, inject } from '@angular/core';
import { Sidebar } from '../../features/sidebar/sidebar';
import { DashboardLayout } from '../../features/dashboard-layout/dashboard-layout';
import { AppState } from '../../state/app-state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'smart-home-layout',
  standalone: true,
  imports: [Sidebar, DashboardLayout],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  appState = inject(AppState);
  route = inject(ActivatedRoute);
}
