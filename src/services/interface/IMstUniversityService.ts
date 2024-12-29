/* eslint-disable prettier/prettier */
import GetMstUniversityInVo from "../vo/GetMstUniversityInVo";
import GetMstUniversityOutVo from "../vo/GetMstUniversityOutVo";

export interface IMstUniversityService {
  getMstUniversity(inVo: GetMstUniversityInVo): Promise<{total: number, results: GetMstUniversityOutVo[]}>
}