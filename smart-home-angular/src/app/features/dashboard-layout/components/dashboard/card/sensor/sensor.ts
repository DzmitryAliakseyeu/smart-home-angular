import { Component, HostBinding, inject, input } from '@angular/core';
import { CardI, CardItemI } from '../../../../../../core/models/dashboard.model';
import { AppState } from '../../../../../../state/app-state';
import { MatIconModule } from '@angular/material/icon';
import { FormatSensorValuesPipe } from '../../../../pipes/format-sensor-values-pipe';
import { v4 as uuidv4 } from 'uuid';

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

   private readonly generatedId = uuidv4();

  @HostBinding('attr.id')
  id = this.generatedId;
}
