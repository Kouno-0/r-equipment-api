/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import GetLendingHistoriesResponseObj from "./GetLendingHistoriesResponseObj";

class GetLendingHistoriesResponse {
  @ApiProperty({ description: '総件数' })
  total!: number;

  @ApiProperty({ description: '検索結果' })
  results!: GetLendingHistoriesResponseObj[]
}
Object.seal(GetLendingHistoriesResponse);
export default GetLendingHistoriesResponse;