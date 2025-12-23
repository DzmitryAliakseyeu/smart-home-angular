import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from "./input-field/input-field";

@Component({
  selector: 'smart-home-modal-auth',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './modal-auth.html',
  styleUrl: './modal-auth.scss',
})
export class ModalAuth {
  userForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ])
  })

  onSubmit(){
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
