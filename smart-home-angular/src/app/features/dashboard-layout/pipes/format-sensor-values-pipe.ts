import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSensorValues',
  standalone: true,
})
export class FormatSensorValuesPipe implements PipeTransform {
  transform(value: string | number | undefined, unit?: string): string {
    if (!value) return '';
    return unit ? `${value} ${unit}` : `${value}`;
  }
}
