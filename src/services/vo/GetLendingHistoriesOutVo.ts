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
  readonly storePlaceCd: string;
  readonly returnPlaceName: string;
  readonly equipmentId: string;
  readonly equipmentCategoryId: string;
  readonly equipmentName: string;
  readonly lendUserTerm: string;
  readonly returnUserTerm: string;
  readonly lendUserName: string;
  readonly returnUserName: string;
  readonly direction: boolean;
  readonly createDate: Date;
  readonly updateDate: Date;
}

Object.seal(LendingHistoriesOutVo);
export default LendingHistoriesOutVo
