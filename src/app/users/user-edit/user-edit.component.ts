import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../user.service';
import {MessagesService} from '../../core/services/messages.service';
import {User} from '../../core/models/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editInProgress = false;
  isCreate = true;
  user: User;
  userForm: FormGroup;

  constructor(
    private service: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msgService: MessagesService
  ) {
  }

  createForm() {
    if (!this.user) {
      this.user = {firstName: '', lastName: '', email: '', password: ''};
    }

    this.userForm = new FormGroup({
      firstname: new FormControl(this.user.firstName,
        [Validators.required, Validators.minLength(2)]
      ),
      lastname: new FormControl(this.user.lastName,
        [Validators.required, Validators.minLength(2)]
      ),
      email: new FormControl(this.user.email,
        [
          Validators.required,
          Validators.email,
        ]
      ),
      password: new FormControl('')
    });

    this.userForm.valueChanges.subscribe(() => {
      if (this.userForm.touched || this.userForm.dirty) {
        this.editInProgress = true;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (!!id) {
        this.isCreate = false;
        this.service.getUser(id).subscribe(user => {
          this.user = user;
          this.createForm();
        });
      }
      this.createForm();
    });
  }

  get f() {
    return this.userForm.controls;
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }
    this.editInProgress = false;

    this.user.firstName = this.f.firstname.value;
    this.user.lastName = this.f.lastname.value;
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;

    (this.isCreate ?
      this.service.createUser(this.user) :
      this.service.updateUser(this.user))
      .subscribe(() => {
        this.msgService.setMessage({
          type: 'success',
          body: 'User is successfully ' + (this.isCreate ? 'created!' : 'edited!')
        });
        this.goBack();
      });
  }

  goBack() {
    if (this.isCreate) {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/users', this.user._id]);
    }
  }

}
