/* eslint-disable prettier/prettier */

import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetMstPositionOutVo{
  readonly positionId? : string;
  readonly positionName? : string;
  readonly isManager? : number;
  readonly createDate? : Date;
  readonly updateDate? : Date;
}

Object.seal(GetMstPositionOutVo);
export default GetMstPositionOutVo