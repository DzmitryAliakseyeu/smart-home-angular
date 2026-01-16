import { Component } from '@angular/core';
import { AddCardModal } from './add-card-modal/add-card-modal';

@Component({
  selector: 'smart-home-add-card-modal-layout',
  standalone: true,
  imports: [AddCardModal],
  templateUrl: './add-card-modal-layout.html',
  styleUrls: ['./add-card-modal-layout.scss'],
})
export class AddCardModalLayout {

}
