import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {User} from '../core/models/user';
import {UsersResponseModel} from '../core/models/users-response.model';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  private apiUrl = environment.apiEmployeesUrl;

  constructor(private http: HttpClient) {
  }

  getUsers(perPage, page): Observable<UsersResponseModel> {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get<UsersResponseModel>(
      `${this.apiUrl}?perPage=${perPage}&page=${page}`,
      {headers}
    );

  }

  getUsersByName(perPage, page, name): Observable<UsersResponseModel> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get<UsersResponseModel>(
      `${this.apiUrl}/search?perPage=${perPage}&page=${page}&search=${name}`,
      {headers}
    );

  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(upUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${upUser._id}`, upUser);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
