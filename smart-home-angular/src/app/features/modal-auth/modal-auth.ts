import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputField } from "./input-field/input-field";

@Component({
  selector: 'smart-home-modal-auth',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './modal-auth.html',
  styleUrl: './modal-auth.scss',
})
export class ModalAuth {
  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
}
