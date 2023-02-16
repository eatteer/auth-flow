import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  public constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.verify().pipe(
      catchError((_) => {
        console.log('NOT AUTHENTICATED');
        this.router.navigate(['/login']);
        return of(false);
      }),
      switchMap((_) => this.authService.auth$),
      map((auth) => {
        const isAdmin = !!auth?.me.roles.includes('admin');
        if (!isAdmin) this.router.navigate(['/']);
        return isAdmin;
      })
    );
  }
}
