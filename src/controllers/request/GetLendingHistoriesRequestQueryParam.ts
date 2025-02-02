/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, Validate } from "class-validator";
import { PARAMS } from "src/common/const/params";
import { IsValidDate } from "src/common/validator/isValidDate";
import { IsFullWidthKatakana } from "../validator/isFullWidthKatakana";

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

  @ApiProperty({ required: false, description:  PARAMS.lendingId })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.lendingId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.lendingId}は$constraint1桁以内で入力してください` })
  lendingId?: string;

  @ApiProperty({ required: false, description:  PARAMS.equipmentId })
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

  @ApiProperty({ required: false, description: '持出会員ID' })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.lendUserId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.userId}は$constraint1桁以内で入力してください` })
  lendUserId?: string;

  @ApiProperty({ required: false, description: '返却会員ID' })
  @Type(() => String)
  @IsOptional()
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.returnUserId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.userId}は$constraint1桁以内で入力してください` })
  returnUserId?: string;

  @ApiProperty({ required: false, description: '会員姓名カナ' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @IsFullWidthKatakana({ message: () => `会員姓名カナは全角カタカナで入力してください` })
  @MaxLength(50, { message: () => `会員姓名カナは$constraint1桁以内で入力してください` })
  userLastNameKana?: string;

  @ApiProperty({ required: false, description: PARAMS.statusCd })
  @Type(() => String)
  @IsOptional()
  @IsIn(['00', '01', '02'], {
    message: `${PARAMS.statusCd}は 00, 01, 02 のいずれかを入力してください`,
  })
  statusCd?: string;


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