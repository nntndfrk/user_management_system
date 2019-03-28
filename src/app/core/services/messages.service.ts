import {Subject} from 'rxjs';
import {MessageModel} from '../models/message.model';

export class MessagesService {
  private messages$ = new Subject<MessageModel>();
  private submit$ = new Subject<boolean>();

  constructor() {
  }

  getMessages() {
    return this.messages$.asObservable();
  }

  setMessage(msg: MessageModel) {
    this.messages$.next(msg);
  }

  getSubmit() {
    return this.submit$.asObservable();
  }

  submit(confirmation = true) {
    this.submit$.next(confirmation);
  }

}
