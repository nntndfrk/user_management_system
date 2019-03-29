import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagesService} from '../core/services/messages.service';
import {AuthService} from '../core/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ]
      ),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      )
    });
  }

  register() {
    this.authService.register(
      this.f.email.value,
      this.f.password.value
    ).subscribe(
      () => {
        this.msgService.setMessage({
          type: 'success',
          body: `${this.f.email.value}, The new administrator is successfully created on the system`
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.msgService.setMessage({
          type: 'danger',
          body: err.error.error
        });
      }
    );
  }


}
