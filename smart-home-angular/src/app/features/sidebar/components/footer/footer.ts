import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service/auth-service';

@Component({
  selector: 'smart-home-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  auth = inject(AuthService);

  userData =  computed(()=>this.auth.userData());
}
