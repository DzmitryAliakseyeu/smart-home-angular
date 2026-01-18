import * as DashboardActions from './dashboard.actions';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../state/app-state';
import { switchMap, take, tap, withLatestFrom } from 'rxjs';
import { selectDashboard, selectTabs } from './dashboard.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Dashboards } from '../../services/dashboards/dashboards';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private router = inject(Router);
  private appState = inject(AppState);
  private managerDashboards = inject(Dashboards);

  removeTabSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.removeTab),
        withLatestFrom(this.store.select(selectTabs)),
        tap(([{ tabId }, tabs]) => {
          const lastTab = tabs.at(-1);
          if (!lastTab) {
            setTimeout(() => {
              this.appState.selectedTabIdSignal.set('');

              this.appState.currentCardsListSignal.set([]);
              const dashboardId = this.appState.selectedDashboardSwitcherIdSignal();
              this.router.navigate(['/dashboard', dashboardId]);
            }, 10);
            return;
          }
          setTimeout(() => {
            this.appState.selectedTabIdSignal.set(lastTab.id);

            this.appState.currentCardsListSignal.set(lastTab.cards);
            const dashboardId = this.appState.selectedDashboardSwitcherIdSignal();
            this.router.navigate(['/dashboard', dashboardId, lastTab.id]);
          }, 10);
        }),
      ),
    { dispatch: false },
  );
  addTabEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.addTab),
        switchMap(() => this.store.select(selectTabs)),
        take(1),
        tap((tabs) => {
          console.log('Updated tabs:', tabs);
        }),
      ),
    { dispatch: false },
  );
  saveDashboard = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.saveDashboard),
        withLatestFrom(this.store.select(selectDashboard)),
        switchMap(([_, dashboard]) =>
          this.managerDashboards.saveDashboard(dashboard.id, dashboard.tabs).pipe(
            tap((data) => {
              this.appState.currentTabsSignal.set(data.tabs);
              this.appState.isUpdatedDashboard.set(true);
            }),
          ),
        ),
      ),
    { dispatch: false },
  );
}
