import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from "./input-field/input-field";
import { AuthService } from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'smart-home-modal-auth',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './modal-auth.html',
  styleUrl: './modal-auth.scss',
})
export class ModalAuth {
  private auth = inject(AuthService);

  userForm = new FormGroup({
    username: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }
    ),

    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    })
  })

  onSubmit(){
    if (this.userForm.valid) {
      const { username, password } = this.userForm.getRawValue();
      this.auth.login(username, password).subscribe({
        next: (res)=> {
          console.log(res)
        },
        error: (res)=> {
          console.log(res)
        }
      })
    }
  }
}
