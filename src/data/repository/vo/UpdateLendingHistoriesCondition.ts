/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class UpdateLendingHistoriesCondition{
  readonly lendingId : string;
  readonly returnUserId : string;
  readonly returnDate : string;
  readonly returnPlaceId : string;
  readonly returnPlaceOther? : string;
  readonly equipmentStatusCd : string;
  readonly remark? : string;
}
Object.seal(UpdateLendingHistoriesCondition);
export default UpdateLendingHistoriesCondition