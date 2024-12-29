/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { GetUsersResponseObj } from "./GetUsersResponseObj";

export class GetUsersResponse {
  @ApiProperty({ description: '総件数' })
  total!: number;

  @ApiProperty({ description: '検索結果' })
  results!: GetUsersResponseObj[]
}