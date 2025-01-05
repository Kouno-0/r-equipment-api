/* eslint-disable prettier/prettier */
import GetLendingHistoriesInVo from "../vo/GetLendingHistoriesInVo";
import GetLendingHistoriesOutVo from "../vo/GetLendingHistoriesOutVo";

export interface ILendingHistoriesService {
  getLendingHistories(inVo: GetLendingHistoriesInVo): Promise<{total: number, results: GetLendingHistoriesOutVo[]}>
}