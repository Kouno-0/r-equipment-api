/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { GetMstEquipmentResponseObj } from "./GetMstEquipmentResponseObj";

export class GetMstEquipmentResponse {
  @ApiProperty({ description: '総件数' })
  total!: number;

  @ApiProperty({ description: '検索結果' })
  results!: GetMstEquipmentResponseObj[]
}