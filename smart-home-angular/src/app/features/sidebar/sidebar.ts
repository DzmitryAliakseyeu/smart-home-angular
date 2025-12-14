import { Component, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { DashboardsSwitcher } from "./components/dashboards-switcher/dashboards-switcher";
import { AppState } from '../../state/app-state';

@Component({
  selector: 'smart-home-sidebar',
  standalone: true,
  imports: [Header, Footer, DashboardsSwitcher],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  appState = inject(AppState)
}
