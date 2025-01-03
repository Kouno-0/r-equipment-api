/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetEquipmentCondition{
  readonly count: number;
  readonly pageNumber: number;
  readonly equipmentId? : string;
  readonly equipmentCategoryId? : string;
  readonly equipmentName? : string;
  readonly purchaseDateFrom? : string;
  readonly purchaseDateTo? : string;
  readonly statusCd? : string;
  readonly sort? : string;
  readonly direction: "ASC" | "DESC";
}
Object.seal(GetEquipmentCondition);
export default GetEquipmentCondition