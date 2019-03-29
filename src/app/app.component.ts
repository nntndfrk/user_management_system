import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './core/services/auth.service';
import {MessagesService} from './core/services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit(): void {
    this.authService.getLoginBus().subscribe(status => {
      if (!status) {
        this.msgService.setMessage({
          type: 'warning',
          body: 'Session is out of time'
        });
        this.logOut();
      }
    });
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
      });
  }
}
