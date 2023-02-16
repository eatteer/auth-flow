import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth, Credentials } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authSub$ = new BehaviorSubject<Auth | undefined>(undefined);

  public auth$ = this._authSub$.asObservable();

  public constructor(private httpClient: HttpClient) {
    this.verify().subscribe();
  }

  public login(credentials: Credentials): Observable<Auth> {
    const endpoint = `${environment.apiBaseUrl}/auth/login`;
    return this.httpClient.post<Auth>(endpoint, credentials).pipe(
      tap((auth) => {
        console.log('LOGIN');
        console.log(auth);
        localStorage.setItem('accessToken', auth.accessToken);
        this._authSub$.next(auth);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    this._authSub$.next(undefined);
  }

  public verify(): Observable<Auth> {
    const endpoint = `${environment.apiBaseUrl}/auth/verify`;
    const accessToken = localStorage.getItem('accessToken');
    return this.httpClient
      .get<Auth>(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        tap((auth) => {
          console.log('VERIFY');
          console.log(auth);
          localStorage.setItem('accessToken', auth.accessToken);
          this._authSub$.next(auth);
        })
      );
  }
}
