import { Component } from '@angular/core';
import { AddNewTabModal } from './add-new-tab-modal/add-new-tab-modal';

@Component({
  selector: 'smart-home-add-new-tab-modal-layout',
  standalone: true,
  imports: [AddNewTabModal],
  templateUrl: './add-new-tab-modal-layout.html',
  styleUrls: ['./add-new-tab-modal-layout.scss'],
})
export class AddNewTabModalLayout {}
