/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, Validate } from "class-validator";
import { PARAMS } from "src/common/const/params";
import { IsValidDate } from "src/common/validator/isValidDate";

export class GetEquipmentRequestQueryParam {

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

  @ApiProperty({ required: false, description: PARAMS.purchaseDateFrom })
  @Type(() => String)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.purchaseDateFrom}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.purchaseDateFrom}は有効な日付を入力してください`,
  })
  purchaseDateFrom?: string;

  @ApiProperty({ required: false, description: PARAMS.purchaseDateTo })
  @Type(() => String)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.purchaseDateTo}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.purchaseDateTo}は有効な日付を入力してください`,
  })
  purchaseDateTo?: string;

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