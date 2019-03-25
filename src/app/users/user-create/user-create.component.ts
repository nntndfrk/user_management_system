import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MessagesService} from '../../core/services/messages.service';
import {User} from '../../core/models/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public editInProgress = false;
  userForm: FormGroup;

  constructor(
    private service: UserService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl('',
        [Validators.required, Validators.minLength(2)]
      ),
      lastname: new FormControl('',
        [Validators.required, Validators.minLength(2)]
      ),
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

    this.userForm.valueChanges.subscribe(() => {
        if (this.userForm.touched || this.userForm.dirty) {
          this.editInProgress = true;
        }
      }
    );

  }

  get f() {
    return this.userForm.controls;
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }

    this.editInProgress = false;
    const user: User = {
      firstName: this.f.firstname.value,
      lastName: this.f.lastname.value,
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.service.createUser(user)
      .subscribe(() => {
        this.msgService.setMessage({
          type: 'success',
          body: 'User is successfully created!'
        });

        setTimeout(() => {
          this.router.navigate(['/users', {action: 'created'}]);
        }, 3000);
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
