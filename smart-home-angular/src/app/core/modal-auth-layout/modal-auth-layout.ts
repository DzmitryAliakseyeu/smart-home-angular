import { Component } from '@angular/core';
import { ModalAuth } from '../../features/modal-auth/modal-auth';

@Component({
  selector: 'smart-home-modal-auth-layout',
  standalone: true,
  imports: [ModalAuth],
  templateUrl: './modal-auth-layout.html',
  styleUrls: ['./modal-auth-layout.scss'],
})
export class ModalAuthLayout {}
