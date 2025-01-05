/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";
@Exclude()
@Expose()
class LendingHistoriesOutVo {
  readonly lendingId: string;
  readonly lendingDate: string;
  readonly useFrom: string;
  readonly useTo: string;
  readonly returnDate: string;
  readonly returnPlaceId: string;
  readonly returnPlaceName: string;
  readonly equipmentId: string;
  readonly equipmentCategoryId: string;
  readonly equipmentName: string;
  readonly userId: string;
  readonly userName: string;
  readonly direction: boolean;
  readonly createDate: Date;
  readonly updateDate: Date;
}

Object.seal(LendingHistoriesOutVo);
export default LendingHistoriesOutVo
