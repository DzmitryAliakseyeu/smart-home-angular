import { Component, computed, inject } from '@angular/core';
import { DashboardI, TabI } from '../../../../core/models/dashboard.model';
import { currentTabs, selectedTabId } from '../../../../state/app.state';
import { MockDataService } from '../../../../core/services/managment-mock-data/managment-mock-data';

@Component({
  selector: 'smart-home-tabs-layout',
  standalone: true,
  imports: [],
  templateUrl: './tabs-layout.html',
  styleUrls: ['./tabs-layout.scss'],
})
export class TabsLayout {
  private dataService = inject(MockDataService);
  tabs: TabI[] = [];
  selectedTabId = selectedTabId
  ngOnInit(){
    this.tabs = this.dataService.getTabsMD();

    selectedTabId.set(this.tabs[0].id)
    console.log(selectedTabId())
    currentTabs.set(this.tabs)


  }

  selectTab(id: string){
    selectedTabId.set(id)
    console.log(selectedTabId())
  }

}
