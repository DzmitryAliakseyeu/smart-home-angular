import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from "./input-field/input-field";
import { AppState } from '../../../state/app-state';

@Component({
  selector: 'smart-home-add-dashboard-modal',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './add-dashboard-modal.html',
  styleUrl: './add-dashboard-modal.scss',
})
export class AddDashboardModal {
  appState = inject(AppState)

  addDashboardForm = new FormGroup({
    id: new FormControl('',
      [Validators.required, Validators.maxLength(30)]
    ),
    title: new FormControl(''),
    icon: new FormControl('')
  })

  closeModal(){
    this.appState.isAddDashboardModalOpen.set(false)
  }

   onSubmit(){
    const {id, title, icon} = this.addDashboardForm.getRawValue()

    console.log({id, title, icon})
  }
}
