import {Component, OnInit} from '@angular/core';
import {pluck, tap} from 'rxjs/operators';

import {User} from '../../core/models/user';
import {UserService} from '../user.service';
import {Page} from '../../core/models/page.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Array<User>;
  totalItems;
  perPage = 2;
  page = 1;
  searchQuery: string;

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    (!!(this.searchQuery)
        ? this.service.getUsersByName(this.perPage, this.page, this.searchQuery)
        : this.service.getUsers(this.perPage, this.page)
    ).pipe(
        tap(res => {
          this.totalItems = res.total;
        }),
        pluck('employees')
      )
      .subscribe((users: User[]) => this.users = users);
  }

  onInputChange(value: string) {
    this.searchQuery = value;
    this.getUsers();
  }

  onPaginatorChange(page: Page) {
    this.page = page.pageNumber;
    this.perPage = page.perPage;
    this.getUsers();
  }

  getAvatar(user: User) {
    return `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`;
  }

  trackByMethod(index, item) {
    if (!item) {
      return null;
    }
    return item._id;
  }

}
