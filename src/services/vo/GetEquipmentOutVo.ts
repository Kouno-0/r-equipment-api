/* eslint-disable prettier/prettier */

import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetEquipmentOutVo {
  readonly equipmentId: string;
  readonly categoryId: string;
  readonly equipmentName: string;
  readonly categoryName: string;
  readonly purchaseDate: string;
  readonly equipmentStateCd: string;
  readonly equipmentState: string;
  readonly storePlaceCd: string;
  readonly storePlace: string;
  readonly status: string;
  readonly createDate: Date;
  readonly updateDate: Date;
}

Object.seal(GetEquipmentOutVo);
export default GetEquipmentOutVo