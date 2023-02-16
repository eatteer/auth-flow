import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Me } from 'src/app/interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styles: [],
})
export class AdminPageComponent {
  public me?: Me;

  public constructor(private authService: AuthService) {
    this.authService.auth$.subscribe((auth) => (this.me = auth?.me));
  }
}
