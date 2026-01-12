import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { iseSelectEditModeOpen } from '../../../../../core/store/edit-mode/edit-mode.selectors';

@Component({
  selector: 'smart-home-edit-mode-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './edit-mode-dashboard.html',
  styleUrls: ['./edit-mode-dashboard.scss'],
})
export class EditModeDashboard {
}
