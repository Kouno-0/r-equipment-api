/* eslint-disable prettier/prettier */
import GetUsersCondition from '../vo/GetMstUsersCondition';
import { UserDto } from '../vo/dto/GetUsersOutDto';

export interface IUsersRepository {
  countUsers(searchParam: GetUsersCondition): Promise<number>
  fetchUsers(searchParam: GetUsersCondition): Promise<UserDto[]>
}
