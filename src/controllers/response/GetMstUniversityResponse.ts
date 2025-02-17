/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { GetMstUniversityResponseObj } from "./GetMstUniversityResponseObj";

export class GetMstUniversityResponse {
  @ApiProperty({ description: '総件数' })
  total!: number;

  @ApiProperty({ description: '検索結果' })
  results!: GetMstUniversityResponseObj[]
}