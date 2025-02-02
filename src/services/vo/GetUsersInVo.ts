/* eslint-disable prettier/prettier */
export default class GetUsersInVo{
  readonly count: number;
  readonly pageNumber: number;
  readonly userId?: string;
  readonly term?: string;
  readonly userNameKana?: string;
  readonly universityId?: string;
  readonly positionId?: string;
  readonly mailAddress?: string;
  readonly sort?: string;
  readonly direction?: string;
}