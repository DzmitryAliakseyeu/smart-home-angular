import { Component } from '@angular/core';
import { AddDashboardModal } from './add-dashboard-modal/add-dashboard-modal';

@Component({
  selector: 'smart-home-add-dashboard-modal-layout',
  standalone: true,
  imports: [AddDashboardModal],
  templateUrl: './add-dashboard-modal-layout.html',
  styleUrls: ['./add-dashboard-modal-layout.scss'],
})
export class AddDashboardModalLayout {}
