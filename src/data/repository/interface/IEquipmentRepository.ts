/* eslint-disable prettier/prettier */
import { EquipmentDto } from '../vo/dto/GetEquipmentDto';
import GetEquipmentCondition from '../vo/GetEquipmentCondition';


export interface IEquipmentRepository {
  countEquipment(searchParam: GetEquipmentCondition): Promise<number>
  fetchEquipment(searchParam: GetEquipmentCondition): Promise<EquipmentDto[]>
}
