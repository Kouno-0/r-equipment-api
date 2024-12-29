/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class GetMstEquipmentResponseObj {
  @ApiProperty({ required: true, description: '装備カテゴリID' })
  equipmentCategoryId?: string;

  @ApiProperty({ required: true, description: '装備カテゴリ名1' })
  equipmentCategoryName1?: string;

  @ApiProperty({ required: false, description: '装備カテゴリ名1' })
  equipmentCategoryName2?: string;

}