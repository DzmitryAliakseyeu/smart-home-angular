import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'smart-home-dashboard-switcher',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-switcher.html',
  styleUrls: ['./dashboard-switcher.scss'],
})
export class DashboardSwitcher {
  @Input() icon?: string;
  title = input.required<string>();
}
