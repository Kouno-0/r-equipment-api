/* eslint-disable prettier/prettier */
import GetUsersInVo from "../vo/GetUsersInVo";
import GetUsersOutVo from "../vo/GetUsersOutVo";

export interface IUsersService {
  getUsers(inVo: GetUsersInVo): Promise<{total: number, results: GetUsersOutVo[]}>
}