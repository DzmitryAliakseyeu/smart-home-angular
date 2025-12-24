import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardI } from '../../models/dashboard.model';

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
}
