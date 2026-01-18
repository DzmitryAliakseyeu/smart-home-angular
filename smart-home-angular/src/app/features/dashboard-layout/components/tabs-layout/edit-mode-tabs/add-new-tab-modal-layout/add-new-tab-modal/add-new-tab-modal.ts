import { Component, inject } from '@angular/core';
import { AppState } from '../../../../../../../state/app-state';
import { Dashboards } from '../../../../../../../core/services/dashboards/dashboards';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTab } from '../../../../../../../core/store/dashboard/dashboard.actions';
import { selectTabs } from '../../../../../../../core/store/dashboard/dashboard.selectors';
import { InputFieldTab } from './input-field-tab/input-field-tab';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-home-add-new-tab-modal',
  standalone: true,
  imports: [InputFieldTab, ReactiveFormsModule],
  templateUrl: './add-new-tab-modal.html',
  styleUrls: ['./add-new-tab-modal.scss'],
})
export class AddNewTabModal {
  appState = inject(AppState);
  managerDashboards = inject(Dashboards);
  store = inject(Store);
  router = inject(Router);

  dashboardId = this.appState.selectedDashboardSwitcherIdSignal();

  addTabForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
    }),
  });

  closeModal() {
    this.appState.isAddTabModalOpen.set(false);
  }

  onSubmit() {
    if (this.addTabForm.invalid) return;

    const { title } = this.addTabForm.getRawValue();
    const modifiedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    const tabs = this.store.selectSignal(selectTabs)();

    const isExistingSameTabTitle = tabs.findIndex((tab) => tab.title === modifiedTitle);

    if (isExistingSameTabTitle !== -1) return;

    this.store.dispatch(addTab({ title: modifiedTitle }));
    this.appState.isAddTabModalOpen.set(false);

    queueMicrotask(() => {
      const updatedTabs = this.store.selectSignal(selectTabs)();
      const newSelectedTab = updatedTabs.filter((tab) => tab.title === modifiedTitle);
      this.appState.selectedTabIdSignal.set(newSelectedTab[0]?.id);
      this.router.navigate(['/dashboard', this.dashboardId, newSelectedTab[0]?.id]);
    });
  }
}
