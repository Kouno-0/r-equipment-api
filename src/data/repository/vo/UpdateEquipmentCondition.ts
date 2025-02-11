/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class UpdateEquipmentCondition{
  readonly equipmentId! : string;
  readonly equipmentName? : string;
  readonly purchaseDate? : string;
  readonly statusCd? : string;
  readonly summary? : string;
  readonly remark? : string;
}
Object.seal(UpdateEquipmentCondition);
export default UpdateEquipmentCondition