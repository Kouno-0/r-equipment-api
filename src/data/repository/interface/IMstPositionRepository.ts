/* eslint-disable prettier/prettier */
import { MstPosition } from 'src/data/entity/MstPositionEntity';
import GetMstPositionCondition from '../vo/GetMstPositionCondition';


export interface IMstPositionRepository {
  countMstPosition(searchParam: GetMstPositionCondition): Promise<number>
  fetchMstPosition(searchParam: GetMstPositionCondition): Promise<MstPosition[]>
}
