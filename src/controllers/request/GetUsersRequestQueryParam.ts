/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength } from "class-validator";
import { COLUMNS } from "src/common/const/column";
import { IsFullWidthKatakana } from "src/controllers/validator/isFullWidthKatakana";

export class GetUsersRequestQueryParam {

  @ApiProperty({ required: false, description: '取得件数' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  count: number = 0;

  @ApiProperty({ required: false, description: 'ページ番号' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 1;

  @ApiProperty({ required: false, description: '会員ID' })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${COLUMNS.userId}は半角文字で入力してください` })
  @MaxLength(9, { message: () => `${COLUMNS.userId}は$constraint1桁以内で入力してください` })
  userId?: string;

  @ApiProperty({ required: false, description: '期' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  term?: number;

  @ApiProperty({ required: false, description: '会員姓名カナ' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @IsFullWidthKatakana({ message: () => `会員姓名カナは全角カタカナで入力してください` })
  @MaxLength(50, { message: () => `会員姓名カナは$constraint1桁以内で入力してください` })
  userLastNameKana?: string;

  @ApiProperty({ required: false, description: '所属ID' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(7, { message: () =>  `${COLUMNS.universityId}は$constraint1桁以内で入力してください`})
  universityId?: string;

  @ApiProperty({ required: false, description: '役職ID' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(4, { message: () =>  `${COLUMNS.positionId}は$constraint1桁以内で入力してください`})
  positionId?: string;

  @ApiProperty({ required: false, description: 'メールアドレス' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(256, { message: () =>  `${COLUMNS.mailAddress}は$constraint1桁以内で入力してください`})
  mailAddress?: string;

  @ApiProperty({ required: false, description: 'ソート' })
  @Type(() => String)
  @IsNotEmpty({ message: 'ソートは必須項目です。' })
  @IsString()
  sort!: string;

  @ApiProperty({ required: false, description: '昇順/降順' })
  @Type(() => String)
  @IsNotEmpty({ message: '昇順/降順は必須項目です。' })
  @IsIn(['ASC', 'DESC'], { message: '昇順/降順は "ASC" または "DESC" のみ有効です。' })
  direction!: string;

}