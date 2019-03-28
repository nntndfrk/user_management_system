import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UserSingleComponent} from './user-single/user-single.component';
import {UserEditComponent} from './user-edit/user-edit.component';

import {AuthGuard} from '../core/guards/auth.guard';
import {CanDeactivateGuard} from '../core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: 'create',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: UserSingleComponent
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {
}
