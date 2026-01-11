import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from "./input-field/input-field";
import { AppState } from '../../../state/app-state';
import { Dashboards } from '../../../core/services/dashboards/dashboards';

@Component({
  selector: 'smart-home-add-dashboard-modal',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './add-dashboard-modal.html',
  styleUrl: './add-dashboard-modal.scss',
})
export class AddDashboardModal {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards)

  addDashboardForm = new FormGroup({
    id: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)]
      }
    ),
    title: new FormControl('', {
      nonNullable: true,
    }),
    icon: new FormControl('', {
      nonNullable: true
    })
  })

  closeModal(){
    this.appState.isAddDashboardModalOpen.set(false)
  }

   onSubmit(){
    if (this.addDashboardForm.invalid) return;
    const {id, title, icon} = this.addDashboardForm.getRawValue()
    const dashboard = {"id": id, "title": title, "icon":icon}
    this.managerDashboards.postNewDashboard(dashboard).subscribe({
      next: ()=> {
        this.appState.isAddDashboardModalOpen.set(false)
        this.managerDashboards.getDashboards().subscribe({
          next: (dashboards)=> {
            this.appState.dashboards.set(dashboards);
            this.appState.setNewSelectedDashboardSwitcherId(dashboard.id);
            this.appState.isChangedDashboard.set(true)
          }
        })
      }
    })

  }
}
