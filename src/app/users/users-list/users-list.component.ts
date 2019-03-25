import {Component, OnInit} from '@angular/core';
import {User} from '../../core/models/user';
import {UserService} from '../user.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Array<User>;

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getUsers().subscribe((users: User[]) => this.users = users);
  }

  getAvatar(user: User) {
    return `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`;
  }

  trackByMethod(index, item) {
    if (!item) { return null; }
    return item._id;
  }

}
