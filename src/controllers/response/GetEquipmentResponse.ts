/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { GetEquipmentResponseObj } from "./GetEquipmentResponseObj";

export class GetEquipmentResponse {
  @ApiProperty({ description: '総件数' })
  total!: number;

  @ApiProperty({ description: '検索結果' })
  results!: GetEquipmentResponseObj[]
}