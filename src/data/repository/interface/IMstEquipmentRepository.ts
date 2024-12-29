/* eslint-disable prettier/prettier */
import { MstEquipment } from 'src/data/entity/MstEquipmentEntity';
import GetMstEquipmentCondition from '../vo/GetMstEquipmentCondition';


export interface IMstEquipmentRepository {
  countMstEquipment(searchParam: GetMstEquipmentCondition): Promise<number>
  fetchMstEquipment(searchParam: GetMstEquipmentCondition): Promise<MstEquipment[]>
}
