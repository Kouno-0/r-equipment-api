/* eslint-disable prettier/prettier */

import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetUsersOutVo{
readonly userId: string;
readonly term: number;
readonly userLastName: string;
readonly userFirstName: string;
readonly userName: string;
readonly userLastNameKana: string;
readonly userFirstNameKana: string;
readonly userNameKana: string;
readonly universityId: string;
readonly universityName: string;
readonly positionId: string;
readonly positionName: string;
readonly mailAddress: string;
readonly createDate: Date;
readonly updateDate: Date;

}

Object.seal(GetUsersOutVo);
export default GetUsersOutVo