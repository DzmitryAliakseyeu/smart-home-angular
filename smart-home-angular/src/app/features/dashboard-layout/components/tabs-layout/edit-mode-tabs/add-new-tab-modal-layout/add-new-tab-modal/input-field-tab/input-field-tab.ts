import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'smart-home-input-field-tab',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-field-tab.html',
  styleUrls: ['./input-field-tab.scss'],
})
export class InputFieldTab {
  text = input('');
  type = input('');
  bunch = input('');
  control = input.required<FormControl>();
  autocomplete = 'off';
}
