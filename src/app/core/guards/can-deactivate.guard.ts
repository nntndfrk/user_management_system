import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {MessagesService} from '../services/messages.service';
import {Observable, of} from 'rxjs';
import {UserEditComponent} from '../../users/user-edit/user-edit.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<any> {
  constructor(private msgService: MessagesService) {
  }

  canDeactivate(component: UserEditComponent): Observable<boolean> {
    if (component.editInProgress) {
      this.msgService.setMessage({
        type: 'warning',
        body: 'Are you sure to leave the page without saving the changes?',
        action: true
      });
      return this.msgService.getSubmit();
    }
    return of(true);
  }

}
