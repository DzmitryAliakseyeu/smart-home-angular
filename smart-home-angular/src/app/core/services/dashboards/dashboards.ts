import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { DashboardI, TabI } from '../../models/dashboard.model';
import { AppState } from '../../../state/app-state';

@Injectable({
  providedIn: 'root',
})
export class Dashboards {
  http = inject(HttpClient);

  getDashboards() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.get<DashboardI[]>('/dashboards', { headers });
  }

  getDashboardTabs(dashboardId: string){
     const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.get<{tabs: TabI[]}>(`/dashboards/${dashboardId}`, { headers });
  }
}
