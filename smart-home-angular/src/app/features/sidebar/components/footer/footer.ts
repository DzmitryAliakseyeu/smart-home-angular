import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service/auth-service';
import { MatIcon } from '@angular/material/icon';
import { TokenStorage } from '../../../../core/services/token-storage/token-storage';
import { Router } from '@angular/router';
import { AppState } from '../../../../state/app-state';

@Component({
  selector: 'smart-home-footer',
  imports: [MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  auth = inject(AuthService);
  tokenStorage = inject(TokenStorage);
  router = inject(Router);
  appState = inject(AppState);

  userData = computed(() => this.auth.userData());
  isAddDashboardModalOpen = computed(() => this.appState.isAddDashboardModalOpen());

  logout() {
    this.tokenStorage.clearToken();
    this.router.navigate(['login']);
  }

  manageAddDashboard() {
    this.appState.isAddDashboardModalOpen.set(!!this.isAddDashboardModalOpen);
  }
}
