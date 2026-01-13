import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'smart-home-input-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.scss'],
})
export class InputField {
  text = input('');
  type = input('');
  bunch = input('');
  control = input.required<FormControl>();
  autocomplete = 'off';
}
