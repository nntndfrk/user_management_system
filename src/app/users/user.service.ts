import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, retry} from 'rxjs/operators';

import {User} from '../core/models/user';

@Injectable()
export class UserService {
  private usersUrl = 'api/employees';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get<User[]>(this.usersUrl, {headers}).pipe(
      delay(0)
    );

  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  updateUser(upUser: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${upUser._id}`, upUser);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.usersUrl}/${id}`)
      .pipe(
        retry(2)
      );
  }

}
