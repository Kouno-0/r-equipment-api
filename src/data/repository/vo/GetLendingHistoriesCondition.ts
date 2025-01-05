/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetLendingHistoriesCondition{
  readonly count: number;
  readonly pageNumber: number;
  readonly lendingId? : string;
  readonly equipmentId? : string;
  readonly equipmentCategoryId? : string;
  readonly lendFrom? : string;
  readonly lendTo? : string;
  readonly useFrom? : string;
  readonly useTo? : string;
  readonly userId? : string;
  readonly userNameKana? : string;
  readonly isReturn? : 0 | 1;
  readonly returnPlaceId: string;
  readonly sort : string;
  readonly direction: "ASC" | "DESC";
}
Object.seal(GetLendingHistoriesCondition);
export default GetLendingHistoriesCondition