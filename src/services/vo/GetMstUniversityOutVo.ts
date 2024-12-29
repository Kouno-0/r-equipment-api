/* eslint-disable prettier/prettier */

import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetMstUniversityOutVo{
  readonly universityId? : string;
  readonly universityName? : string;
  readonly isReturnPlace? : number;
  readonly createDate? : Date;
  readonly updateDate? : Date;
}

Object.seal(GetMstUniversityOutVo);
export default GetMstUniversityOutVo