/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, Validate } from "class-validator";
import { PARAMS } from "src/common/const/params";
import { TYPE_CODE } from "src/common/const/typeCode";
import { IsValidDate } from "src/common/validator/isValidDate";

export class GetLendingHistoriesRequestQueryParam {

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

  @ApiProperty({ required: false, description: PARAMS.lendingId })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.lendingId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.lendingId}は$constraint1桁以内で入力してください` })
  lendingId?: string;

  @ApiProperty({ required: false, description: PARAMS.equipmentId })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.equipmentId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.equipmentId}は$constraint1桁以内で入力してください` })
  equipmentId?: string;

  @ApiProperty({ required: false, description: PARAMS.equipmentCategoryId })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.equipmentCategoryId}は半角文字で入力してください` })
  @MaxLength(5, { message: () => `${PARAMS.equipmentCategoryId}は$constraint1桁以内で入力してください` })
  equipmentCategoryId?: string;

  @ApiProperty({ required: false, description: PARAMS.lendFrom })
  @Type(() => String)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.lendFrom}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.lendFrom}は有効な日付を入力してください`,
  })
  lendFrom?: string;

  @ApiProperty({ required: false, description: PARAMS.lendTo })
  @Type(() => String)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.lendTo}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.lendTo}は有効な日付を入力してください`,
  })
  lendTo?: string;

  @ApiProperty({ required: false, description: PARAMS.useFrom })
  @Type(() => String)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.useFrom}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.useFrom}は有効な日付を入力してください`,
  })
  useFrom?: string;

  @ApiProperty({ required: false, description: PARAMS.useTo })
  @Type(() => String)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.useTo}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.useTo}は有効な日付を入力してください`,
  })
  useTo?: string;

  @ApiProperty({ required: false, description: PARAMS.equipmentStateCd })
  @Type(() => String)
  @IsOptional()
  @IsIn(TYPE_CODE.equipmentState, {
    message: `${PARAMS.equipmentStateCd}の設定値が不正です`,
  })
  lendingStateCd?: string;

  @ApiProperty({ required: false, description: PARAMS.lendUserTerm })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[0-9]+$/, { message: () => `${PARAMS.lendUserTerm}は半角数字で入力してください` })
  @MaxLength(2, { message: () => `${PARAMS.lendUserTerm}は$constraint1桁以内で入力してください` })
  lendUserTerm?: string;

  @ApiProperty({ required: false, description: PARAMS.lendUserName })
  @Type(() => String)
  @IsOptional()
  @MaxLength(20, { message: () => `${PARAMS.lendingId}は$constraint1桁以内で入力してください` })
  lendUserName?: string;

  @ApiProperty({ required: false, description: PARAMS.returnUserTerm })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[0-9]+$/, { message: () => `${PARAMS.returnUserTerm}は半角数字で入力してください` })
  @MaxLength(2, { message: () => `${PARAMS.returnUserTerm}は$constraint1桁以内で入力してください` })
  returnUserTerm?: string;

  @ApiProperty({ required: false, description: PARAMS.returnUserName })
  @Type(() => String)
  @IsOptional()
  @MaxLength(20, { message: () => `${PARAMS.lendingId}は$constraint1桁以内で入力してください` })
  returnUserName?: string;


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