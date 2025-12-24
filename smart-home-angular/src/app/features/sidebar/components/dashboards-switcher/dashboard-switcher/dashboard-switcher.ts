import { Component, Input, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'smart-home-dashboard-switcher',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './dashboard-switcher.html',
  styleUrls: ['./dashboard-switcher.scss'],
})
export class DashboardSwitcher {
  title = input.required<string>();
  icon = input.required<string>();
}
