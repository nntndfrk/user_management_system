import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessagesService} from '../core/services/messages.service';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) { }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/users']);
    }
  }

  login() {
    this.errorMessage = '';

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.credentials.username}, You successfully logged in system. Welcome!`
          });
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        err => {
          this.errorMessage = err.error.error;
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }
}
