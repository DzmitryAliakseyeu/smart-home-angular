import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CardItemI, DashboardI, TabI } from '../../models/dashboard.model';

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

  getDashboardTabs(dashboardId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.get<{ tabs: TabI[] }>(`/dashboards/${dashboardId}`, { headers });
  }

  postNewDashboard(dashboard: { id: string; title: string; icon: string }) {
    return this.http.post('/dashboards', dashboard);
  }

  deleteDashboard(dashboardId: string) {
    return this.http.delete(`/dashboards/${dashboardId}`);
  }

  putDashboard(dashboardId: string, data: TabI[]) {
    return this.http.put<{ tabs: TabI[] }>(`/dashboards/${dashboardId}`, { tabs: data });
  }

  saveDashboard(dashboardId: string, data: TabI[]) {
    return this.http.put<{ tabs: TabI[] }>(`/dashboards/${dashboardId}`, { tabs: data });
  }

  toggleDeviceState(deviceId: string, state: boolean) {
    return this.http.patch<CardItemI>(`/devices/${deviceId}`, { state: state });
  }

  getDevices() {
    return this.http.get<CardItemI[]>('/devices');
  }
}
