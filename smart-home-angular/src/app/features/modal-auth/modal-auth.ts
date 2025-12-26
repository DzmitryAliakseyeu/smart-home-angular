import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from './input-field/input-field';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-home-modal-auth',
  standalone: true,
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './modal-auth.html',
  styleUrls: ['./modal-auth.scss'],
})
export class ModalAuth {
  private auth = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal('');

  userForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  onSubmit() {
    this.errorMessage.set('');
    if (this.userForm.valid) {
      const { username, password } = this.userForm.getRawValue();
      this.auth.login(username, password).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },
        error: (res) => {
          if (res.status === 401) {
            this.errorMessage.set('Invalid login or password.');
          } else {
            this.errorMessage.set('Unknown error occurred. Please try again later.');
          }
        },
      });
    }
  }


  onFocus(){
    this.errorMessage.set('')
  }
}
