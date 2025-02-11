/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, Matches, MaxLength, Validate } from "class-validator";
import { PARAMS } from "src/common/const/params";
import { IsValidDate } from "src/common/validator/isValidDate";

export class UpdateLendingHistoriesRequestBody {

  @ApiProperty({ required: false, description:  PARAMS.equipmentId })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.equipmentId}は必須項目です` })
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.equipmentId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.equipmentId}は$constraint1桁以内で入力してください` })
  equipmentId!: string;

  @ApiProperty({ required: false, description: PARAMS.returnUserId })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.equipmentId}は必須項目です` })
  @Matches(/^[\x20-\x7E]*$/, { message: () => `${PARAMS.returnUserId}は半角文字で入力してください` })
  @MaxLength(7, { message: () => `${PARAMS.returnUserId}は$constraint1桁以内で入力してください` })
  returnUserId!: string;

  @ApiProperty({ required: false, description: PARAMS.returnDate })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.equipmentId}は必須項目です` })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `${PARAMS.returnDate}はYYYY-MM-DD形式で入力してください`,
  })
  @Validate(IsValidDate, {
    message: `${PARAMS.returnDate}は有効な日付を入力してください`,
  })
  returnDate!: string;

  @ApiProperty({ required: false, description: PARAMS.returnPlaceId })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.returnPlaceId}は必須項目です` })
  @MaxLength(3, { message: () => `${PARAMS.returnPlaceId}は$constraint1桁以内で入力してください` })
  returnPlaceId!: string;

  @ApiProperty({ required: false, description: PARAMS.returnPlaceId })
  @Type(() => String)
  @IsOptional()
  @MaxLength(30, { message: () => `${PARAMS.returnPlaceOther}は$constraint1桁以内で入力してください` })
  returnPlaceOther?: string;

  @ApiProperty({ required: false, description: PARAMS.statusCd })
  @Type(() => String)
  @IsNotEmpty({ message: `${PARAMS.statusCd}は必須項目です` })
  @IsIn(['00', '01', '02'], { message: () => `${PARAMS.statusCd}は'00', '01', '02'のいずれかで入力してください。` })
  statusCd?: string;

}