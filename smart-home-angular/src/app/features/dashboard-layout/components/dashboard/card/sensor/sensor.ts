import { Component, inject, input } from '@angular/core';
import { CardItemI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';

@Component({
  selector: 'smart-home-sensor',
  standalone: true,
  imports: [],
  templateUrl: './sensor.html',
  styleUrls: ['./sensor.scss'],
})
export class Sensor {
  appState = inject(AppState)
  item = input.required<CardItemI>()
}
