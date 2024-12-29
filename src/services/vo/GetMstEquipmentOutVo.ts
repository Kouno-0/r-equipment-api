/* eslint-disable prettier/prettier */

import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetMstEquipmentOutVo{
  readonly equipmentCategoryId? : string;
  readonly equipmentCategoryName1? : string;
  readonly equipmentCategoryName2? : string;
  readonly createDate? : Date;
  readonly updateDate? : Date;
}

Object.seal(GetMstEquipmentOutVo);
export default GetMstEquipmentOutVo