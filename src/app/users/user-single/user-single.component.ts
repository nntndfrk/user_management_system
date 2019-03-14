import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../../core/models/user';
import {UserService} from '../user.service';
import {MessagesService} from '../../core/services/messages.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  user: User;
  users: User[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private messagesService: MessagesService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.service.getUser(id)
        .subscribe(
          user => {
            if (user) {
              this.user = user;
            }
          },
          error => {
            this.messagesService.setMessage({
              type: 'warning',
              body: error
            });
            this.router.navigate(['/users', {action: error}]);
          }
        );
    });
  }

  deleteUser() {
    this.service.deleteUser(this.user.id)
      .subscribe(() => {
        this.router.navigate(['/users', {action: 'deleted'}]);
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
