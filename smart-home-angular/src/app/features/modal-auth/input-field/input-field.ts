import { Component, input } from '@angular/core';

@Component({
  selector: 'smart-home-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.scss'],
})
export class InputField {
  text = input('');
  bunch =  input('');
  type = input('');
}
