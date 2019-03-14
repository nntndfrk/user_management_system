import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UserSingleComponent} from './user-single/user-single.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {CanDeactivateGuard} from '../core/guards/can-deactivate.guard';
import {UserService} from './user.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent
  ],
  providers: [
    UserService,
    AuthGuard,
    CanDeactivateGuard
  ]
})
export class UsersModule {
}
