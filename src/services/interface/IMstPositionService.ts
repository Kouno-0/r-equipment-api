/* eslint-disable prettier/prettier */
import GetMstPositionInVo from "../vo/GetMstPositionInVo";
import GetMstPositionOutVo from "../vo/GetMstPositionOutVo";

export interface IMstPositionService {
  getMstPosition(inVo: GetMstPositionInVo): Promise<{total: number, results: GetMstPositionOutVo[]}>
}