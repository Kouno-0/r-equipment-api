/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class CreateLendingHistoriesCondition{
  readonly equipmentId : string;
  readonly lendUserId : string;
  readonly lendDate : string;
  readonly useFrom : string;
  readonly useTo : string;
  readonly destination : string;
}
Object.seal(CreateLendingHistoriesCondition);
export default CreateLendingHistoriesCondition