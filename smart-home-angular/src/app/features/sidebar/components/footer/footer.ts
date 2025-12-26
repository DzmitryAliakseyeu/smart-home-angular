import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service/auth-service';
import { MatIcon } from "@angular/material/icon";
import { TokenStorage } from '../../../../core/services/token-storage/token-storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-home-footer',
  imports: [MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  auth = inject(AuthService);
  tokenStorage = inject(TokenStorage);
  router= inject(Router)

  userData =  computed(()=>this.auth.userData());

  logout(){
    this.tokenStorage.clearToken();
    this.router.navigate(['login']);
  }
}
