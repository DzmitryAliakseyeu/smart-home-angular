import { Component, computed, effect, inject } from '@angular/core';
import { MockDataService } from '../../../../core/services/managment-mock-data/managment-mock-data';
import {  currentCardsListSignal, selectedDashboardSwitcherSignal, selectedTabIdSignal } from '../../../../state/app.state';
import { CardI } from '../../../../core/models/dashboard.model';
import { setCurrentCardsListSignal } from '../../../../state/app.store';
import { Card } from "./card/card";
import { AppState } from '../../../../state/app-state';

@Component({
  selector: 'smart-home-dashboard',
   standalone: true,
  imports: [Card],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  appState = inject(AppState);
}
