import { Component, inject, input, Input } from '@angular/core';
import { CardI, CardItemI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';

@Component({
  selector: 'smart-home-device',
  standalone: true,
  imports: [],
  templateUrl: './device.html',
  styleUrls: ['./device.scss'],
})
export class Device {
  appState = inject(AppState)
 item = input.required<CardItemI>();
 card = input.required<CardI>();
}
