import {Component, OnInit} from '@angular/core';
import {User} from '../../core/models/user';
import {UserService} from '../user.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getUsers().subscribe((users: User[]) => this.users = users);
  }

}
