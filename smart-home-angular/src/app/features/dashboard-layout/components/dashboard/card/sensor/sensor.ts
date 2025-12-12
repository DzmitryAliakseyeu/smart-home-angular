import { Component, inject, input } from '@angular/core';
import { CardI, CardItemI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'smart-home-sensor',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sensor.html',
  styleUrls: ['./sensor.scss'],
})
export class Sensor {
  appState = inject(AppState)
  item = input.required<CardItemI>();
  card=input<CardI>()
}
