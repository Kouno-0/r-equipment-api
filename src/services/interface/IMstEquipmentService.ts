/* eslint-disable prettier/prettier */
import GetMstEquipmentInVo from "../vo/GetMstEquipmentInVo";
import GetMstEquipmentOutVo from "../vo/GetMstEquipmentOutVo";

export interface IMstEquipmentService {
  getMstEquipment(inVo: GetMstEquipmentInVo): Promise<{total: number, results: GetMstEquipmentOutVo[]}>
}