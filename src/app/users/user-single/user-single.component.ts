import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {User} from '../../core/models/user';
import {UserService} from '../user.service';
import {MessagesService} from '../../core/services/messages.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit, OnDestroy {
  user: User;
  users: User[];
  consfirm$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private messagesService: MessagesService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
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
            this.router.navigate(['/users']);
          }
        );
    });
  }

  deleteUser() {
    this.messagesService.setMessage({
      type: 'warning',
      body: 'Are you sure to delete this employee?',
      action: true
    });

    this.consfirm$ = this.messagesService.getSubmit().subscribe(submit => {
      if (submit) {
        this.service.deleteUser(this.user._id).subscribe(
          () => {
            this.messagesService.setMessage({
              type: 'success',
              body: 'User is successfully deleted!'
            });
            this.router.navigate(['/users']);
          },
          (err) => {
            this.messagesService.setMessage({
              type: 'danger',
              body: err.status === 0 ? 'HTTP Error' : 'Unknown Error'
            });
          });
      }
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  ngOnDestroy() {
    if (!!this.consfirm$) {
      this.consfirm$.unsubscribe();
    }
  }

}
