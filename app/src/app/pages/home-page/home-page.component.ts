import { Component } from '@angular/core';
import { Me } from 'src/app/interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent {
  public me?: Me;

  public constructor(private authService: AuthService) {
    this.authService.auth$.subscribe((auth) => (this.me = auth?.me));
  }
}
