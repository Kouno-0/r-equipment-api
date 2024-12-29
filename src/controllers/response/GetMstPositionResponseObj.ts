/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

class GetMstPositionResponseObj {
  @ApiProperty({ required: true, description: '役職ID' })
  positionId?: string;

  @ApiProperty({ required: true, description: '役職名' })
  positionName?: string;

  @ApiProperty({ required: false, description: '管理者権限' })
  isManager?: number;

}
Object.seal(GetMstPositionResponseObj);
export default GetMstPositionResponseObj;