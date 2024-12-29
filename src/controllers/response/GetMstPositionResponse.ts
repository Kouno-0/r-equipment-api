/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { GetUsersResponseObj } from "./GetUsersResponseObj";

class GetMstPositionResponse {
  @ApiProperty({ description: '総件数' })
  total!: number;

  @ApiProperty({ description: '検索結果' })
  results!: GetUsersResponseObj[]
}
Object.seal(GetMstPositionResponse);
export default GetMstPositionResponse;