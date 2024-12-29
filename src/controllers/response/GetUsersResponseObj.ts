/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class GetUsersResponseObj {
  @ApiProperty({ required: false, description: '会員ID' })
  userId?: string;

  @ApiProperty({ required: false, description: '期' })
  term?: number;

  @ApiProperty({ required: false, description: '会員姓' })
  userLastName?: string;

  @ApiProperty({ required: false, description: '会員名' })
  userFirstName?: string;

  @ApiProperty({ required: false, description: '会員姓名' })
  userName?: string;

  @ApiProperty({ required: false, description: '会員姓カナ' })
  userLastNameKana?: string;

  @ApiProperty({ required: false, description: '会員名カナ' })
  userFirstNameKana?: string;

  @ApiProperty({ required: false, description: '会員姓名カナ' })
  userNameKana?: string;

  @ApiProperty({ required: false, description: '所属ID' })
  universityId?: string;

  @ApiProperty({ required: false, description: '所属名' })
  universityName?: string;

  @ApiProperty({ required: false, description: '役職ID' })
  positionId?: string;

  @ApiProperty({ required: false, description: '役職名' })
  positionName?: string;

  @ApiProperty({ required: false, description: 'メールアドレス' })
  mailAddress?: string;

}