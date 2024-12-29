/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetMstEquipmentCondition{
  readonly equipmentCategoryId? : string;
  readonly equipmentCategoryName1? : string;
  readonly equipmentCategoryName2? : string;
}
Object.seal(GetMstEquipmentCondition);
export default GetMstEquipmentCondition