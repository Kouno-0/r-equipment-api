/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

class GetEquipmentResponseObj {
  @ApiProperty({ required: false, description: '貸出ID' })
  lendingId!: string;

  @ApiProperty({ required: false, description: '貸出日' })
  lendingDate?: string;

  @ApiProperty({ required: false, description: '使用期間(From)' })
  useFrom?: string;

  @ApiProperty({ required: false, description: '使用期間(To)' })
  useTo?: string;

  @ApiProperty({ required: false, description: '返却日' })
  returnDate?: string;

  @ApiProperty({ required: false, description: '返却場所ID' })
  returnPlaceId!: string;

  @ApiProperty({ required: false, description: '返却場所名' })
  returnPlaceName!: string;

  @ApiProperty({ required: false, description: '装備ID' })
  equipmentId!: string;

  @ApiProperty({ required: false, description: '装備カテゴリID' })
  equipmentCategoryId!: string;

  @ApiProperty({ required: false, description: '装備名' })
  equipmentName!: string;

  @ApiProperty({ required: false, description: '持出会員ID' })
  lendUserId?: string;

  @ApiProperty({ required: false, description: '返却会員ID' })
  returnUserId?: string;

  @ApiProperty({ required: false, description: '持出会員姓名' })
  lendUserName?: string;

  @ApiProperty({ required: false, description: '返却会員姓名' })
  returnUserName?: string;

  @ApiProperty({ required: false, description: '行き先' })
  destination?: string;

  @ApiProperty({ required: false, description: '登録日時' })
  createDate!: Date;

  @ApiProperty({ required: false, description: '更新日時' })
  updateDate!: Date;

}
Object.seal(GetEquipmentResponseObj);
export default GetEquipmentResponseObj;