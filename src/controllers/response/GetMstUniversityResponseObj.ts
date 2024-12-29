/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class GetMstUniversityResponseObj {
  @ApiProperty({ required: true, description: '大学ID' })
  universityId?: string;

  @ApiProperty({ required: true, description: '大学名' })
  universityName?: string;

  @ApiProperty({ required: false, description: '返却場所フラグ' })
  isReturnPlace?: number;

}