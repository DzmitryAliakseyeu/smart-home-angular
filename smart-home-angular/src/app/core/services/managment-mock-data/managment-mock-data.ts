import { Injectable } from '@angular/core';
import MockData from '../../../../mock-data.json'
import { TabI } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {

  getTabsMD(): TabI[]{
    return MockData.tabs as TabI[]
  }

}
