/* eslint-disable prettier/prettier */

import GetEquipmentInVo from "../vo/GetEquipmentInVo";
import GetEquipmentOutVo from "../vo/GetEquipmentOutVo";
import UpdateEquipmentInVo from "../vo/UpdateEquipmentInVo";

export interface IEquipmentService {
  getEquipment(inVo: GetEquipmentInVo): Promise<{total: number, results: GetEquipmentOutVo[]}>
  updateEquipment(inVo: UpdateEquipmentInVo): Promise<void>
}