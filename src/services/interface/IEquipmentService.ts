/* eslint-disable prettier/prettier */

import GetEquipmentInVo from "../vo/GetEquipmentInVo";
import GetEquipmentOutVo from "../vo/GetEquipmentOutVo";

export interface IEquipmentService {
  getEquipment(inVo: GetEquipmentInVo): Promise<{total: number, results: GetEquipmentOutVo[]}>
}