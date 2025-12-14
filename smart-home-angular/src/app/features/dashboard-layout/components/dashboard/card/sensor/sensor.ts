import { Component, inject, input } from '@angular/core';
import { CardI, CardItemI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';
import { MatIconModule } from '@angular/material/icon';
import { FormatSensorValuesPipe } from '../../../../pipes/format-sensor-values-pipe';

@Component({
  selector: 'smart-home-sensor',
  standalone: true,
  imports: [MatIconModule, FormatSensorValuesPipe],
  templateUrl: './sensor.html',
  styleUrls: ['./sensor.scss'],
})
export class Sensor {
  appState = inject(AppState);
  item = input.required<CardItemI>();
  card = input<CardI>();
}
