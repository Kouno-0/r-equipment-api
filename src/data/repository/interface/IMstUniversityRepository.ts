/* eslint-disable prettier/prettier */
import { MstUniversity } from 'src/data/entity/MstUniversityEntity';
import GetMstUniversityCondition from '../vo/GetMstUniversityCondition';

export interface IMstUniversityRepository {
  countMstUniversity(searchParam: GetMstUniversityCondition): Promise<number>
  fetchMstUniversity(searchParam: GetMstUniversityCondition): Promise<MstUniversity[]>
}
