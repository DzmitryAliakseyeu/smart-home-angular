import { Component, computed, effect, inject } from '@angular/core';
import { DashboardI, TabI } from '../../../../core/models/dashboard.model';

import { MockDataService } from '../../../../core/services/managment-mock-data/managment-mock-data';
import { currentTabsSignal, selectedDashboardSwitcherSignal, selectedTabIdSignal } from '../../../../state/app.state';
import { setCurrentTabsSignal } from '../../../../state/app.store';
import { AppState } from '../../../../state/app-state';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  private dataService = inject(MockDataService);
  appState = inject(AppState);
  // tabs: TabI[] = [];
  // selectedTabId = selectedTabIdSignal;

  // constructor(){
  //    effect(()=>{
  //     if(selectedDashboardSwitcherSignal() === 'dsh-overview'){
  //       this.tabs = this.dataService.getTabsMD();
  //       selectedTabIdSignal.set(this.tabs[0].id)
  //       setCurrentTabsSignal(this.tabs)
  //       return
  //     }
  //     this.tabs = []
  //     return

  //   })
  // }

  // selectTab(id: string){
  //   selectedTabIdSignal.set(id)
  // }
}
