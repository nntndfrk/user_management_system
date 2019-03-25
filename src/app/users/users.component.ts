import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MessagesService} from '../core/services/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private msgService;
  constructor(
    private activatedRoute: ActivatedRoute,
    msgService: MessagesService
  ) {
    this.msgService = msgService;
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const action = params.get('action');
      if (action === 'created') {
        this.msgService.setMessage({
          type: 'success',
          body: 'User is successfully created!'
        });
      }
      if (action === 'deleted') {
        this.msgService.setMessage({
          type: 'info',
          body: 'User is successfully deleted'
        });
      }
    });
  }

}
