import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  // use fake api reqres.in
  private authUrl = '/api';
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login/signin`, {email: username, password})
      .pipe(
        retry(2),
        tap(res => {
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
            this.loggedIn = true;
          }
        }),
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login/signup`, {email: username, password});
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }
}
