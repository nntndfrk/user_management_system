import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {
  private authUrl = environment.apiLoginUrl;
  private loggedIn = false;
  private loginBus$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getLoginBus() {
    return this.loginBus$.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/signin`, {email: username, password})
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
            this.loggedIn = true;
          }
        }),
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, {email: username, password});
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.loginBus$.next(this.loggedIn);
  }
}
