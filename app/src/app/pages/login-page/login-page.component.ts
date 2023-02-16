import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  public form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public submit(): void {
    const credentials: Credentials = this.form.getRawValue();
    this.authService
      .login(credentials)
      .pipe(
        tap((_) => {
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
