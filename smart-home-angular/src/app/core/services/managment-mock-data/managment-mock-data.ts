import { Injectable } from '@angular/core';
import MockData from '../../../../mock-data.json'
import { CardI, TabI } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {

  getTabsMD(): TabI[]{
    return MockData.tabs as TabI[]
  }

  getCardsList(tabId: string): CardI[]{
    const tab = (MockData.tabs as TabI[]).find((tab) => tab.id === tabId)
    return tab ? tab.cards : []
  }

}
