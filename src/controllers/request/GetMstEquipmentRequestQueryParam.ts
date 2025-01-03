/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { PARAMS } from "src/common/const/params";

class GetMstEquipmentRequestQueryParam {

  @ApiProperty({ required: false, description: '装備カテゴリID' })
  @Type(() => String)
  @IsOptional()
  @MaxLength(5, { message: () => `${PARAMS.equipmentCategoryId}は$constraint1桁以内で入力してください` })
  equipmentCategoryId?: string;

  @ApiProperty({ required: false, description: '装備カテゴリ名1' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(30, { message: `${PARAMS.equipmentCategoryName1}は$constraint1桁以内で入力してください` })
  equipmentCategoryName1?: string;

  @ApiProperty({ required: false, description: '装備カテゴリ名2' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(30, { message: `${PARAMS.equipmentCategoryName1}は$constraint1桁以内で入力してください` })
  equipmentCategoryName2?: string;
}
Object.seal(GetMstEquipmentRequestQueryParam);
export default GetMstEquipmentRequestQueryParam;