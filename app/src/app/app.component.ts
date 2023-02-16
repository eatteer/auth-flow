import { Component } from '@angular/core';
import { Me } from './interfaces/auth.interfaces';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  public me?: Me;

  public constructor(private router: Router, private authService: AuthService) {
    this.authService.auth$.subscribe((auth) => (this.me = auth?.me));
  }

  public logout(): void {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
