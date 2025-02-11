/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, Matches, MaxLength, Validate } from "class-validator";
import { PARAMS } from "src/common/const/params";
import { IsValidDate } from "src/common/validator/isValidDate";

export class CreateLendingHistoriesRequestBody {

  @ApiProperty({ required: false, description:  PARAMS.equipmentId })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.equipmentId}は必須項目です` })
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.equipmentId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.equipmentId}は$constraint1桁以内で入力してください` })
  equipmentId!: string;

  @ApiProperty({ required: false, description: PARAMS.lendUserId })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.equipmentId}は必須項目です` })
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.lendUserId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.lendUserId}は$constraint1桁以内で入力してください` })
  lendUserId!: string;

  @ApiProperty({ required: false, description: PARAMS.lendDate })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.lendDate}は必須項目です` })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.lendDate}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.lendDate}は有効な日付を入力してください`,
  })
  lendDate!: string;

  @ApiProperty({ required: false, description: PARAMS.useFrom })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.useFrom}は必須項目です` })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.useFrom}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.useFrom}は有効な日付を入力してください`,
  })
  useFrom!: string;

  @ApiProperty({ required: false, description: PARAMS.useTo })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.useTo}は必須項目です` })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.useTo}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.useTo}は有効な日付を入力してください`,
  })
  useTo!: string;

  @ApiProperty({ required: false, description: PARAMS.destination })
  @Type(() => String)
  @IsOptional()
  @MaxLength(7, { message: () => `${PARAMS.lendUserId}は$constraint1桁以内で入力してください` })
  destination!: string;

  @ApiProperty({ required: false, description: PARAMS.isHandOver })
  @Type(() => String)
  @IsOptional()
  @IsIn(['1'], { message: () => `${PARAMS.isHandOver}は'1'またはnullで入力してください。` })
  isHandOver?: string;


}