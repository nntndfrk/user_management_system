import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './core/services/auth.service';
import {MessagesService} from './core/services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.router.navigate(['/login'])
      .then((isNavigate) => {
        if (isNavigate) {
          this.authService.logout();
        }
      })
      .catch((err) => {
        this.msgService.setMessage({
          type: 'danger',
          body: err
        });
      });
  }
}
