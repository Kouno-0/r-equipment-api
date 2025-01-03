/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class GetEquipmentResponseObj {
  @ApiProperty({ required: false, description: '装備ID' })
  equipmentId!: string;

  @ApiProperty({ required: false, description: '装備カテゴリID' })
  categoryId!: string;

  @ApiProperty({ required: false, description: '装備名' })
  equipmentName!: string;

  @ApiProperty({ required: false, description: '装備カテゴリ名' })
  categoryName!: string;

  @ApiProperty({ required: false, description: '購入日' })
  purchaseDate?: string;

  @ApiProperty({ required: false, description: '状態区分' })
  statusCd!: string;

  @ApiProperty({ required: false, description: '状態' })
  status!: string;

  @ApiProperty({ required: false, description: '登録日時' })
  createDate!: Date;

  @ApiProperty({ required: false, description: '更新日時' })
  updateDate!: Date;



}