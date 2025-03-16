/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class GetEquipmentResponseObj {
  @ApiProperty({ required: true, description: '装備ID' })
  equipmentId!: string;

  @ApiProperty({ required: true, description: '装備カテゴリID' })
  categoryId!: string;

  @ApiProperty({ required: true, description: '装備名' })
  equipmentName!: string;

  @ApiProperty({ required: true, description: '装備カテゴリ名' })
  categoryName!: string;

  @ApiProperty({ required: true, description: '購入日' })
  purchaseDate?: string;

  @ApiProperty({ required: true, description: '装備状態区分' })
  equipmentStateCd!: string;

  @ApiProperty({ required: true, description: '装備状態' })
  equipmentState!: string;

  @ApiProperty({ required: false, description: '保管場所ID' })
  storePlaceId?: string;

  @ApiProperty({ required: false, description: '保管場所' })
  storePlaceName?: string;

  @ApiProperty({ required: false, description: '概要' })
  summary?: string;

  @ApiProperty({ required: false, description: '備考備考' })
  remark?: string;

  @ApiProperty({ required: true, description: '登録日時' })
  createDate!: Date;

  @ApiProperty({ required: true, description: '更新日時' })
  updateDate!: Date;



}