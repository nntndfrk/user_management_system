import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../../core/models/message';
import {MessagesService} from '../../../core/services/messages.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {
  isShow = false;
  message: Message;
  messages$: Subscription;

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.messages$ = this.messagesService.getMessages()
      .subscribe((msg: Message) => {
        this.message = msg;
        this.isShow = true;
        if (!msg.action) {
          setTimeout(() => this.isShow = false, 4000);
        }
      });
  }

  submit() {
    this.isShow = false;
    this.messagesService.submit();
  }

  close() {
    this.isShow = false;
    this.messagesService.submit(false);
  }

  ngOnDestroy(): void {
    this.messages$.unsubscribe();
  }
}
