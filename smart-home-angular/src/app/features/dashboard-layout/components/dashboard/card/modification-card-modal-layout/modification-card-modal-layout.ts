import { Component } from '@angular/core';
import { ModificationCardModal } from './modification-card-modal/modification-card-modal';

@Component({
  selector: 'smart-home-modification-card-modal-layout',
  imports: [ModificationCardModal],
  templateUrl: './modification-card-modal-layout.html',
  styleUrl: './modification-card-modal-layout.scss',
})
export class ModificationCardModalLayout {}
