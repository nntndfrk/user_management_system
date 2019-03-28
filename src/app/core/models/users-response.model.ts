import {User} from './user';

export class UsersResponseModel {
  employees: User[];
  page: number;
  total: number;
}
