import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagesService} from '../core/services/messages.service';
import {AuthService} from '../core/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/users']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('GavinBelson@hooli.xyz',
        [
          Validators.required,
          Validators.email,
        ]
      ),
      password: new FormControl('admin12345',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      )
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {

    this.authService.login(
      this.f.email.value,
      this.f.password.value
    ).subscribe(
      () => {
        this.msgService.setMessage({
          type: 'success',
          body: `${this.f.email.value}, You successfully logged in system. Welcome!`
        });
        this.router.navigate(['/users']);
      },
      err => {
        this.msgService.setMessage({
          type: 'danger',
          body: err.error.message
        });
      }
    );
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}
