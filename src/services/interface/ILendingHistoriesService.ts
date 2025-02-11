/* eslint-disable prettier/prettier */
import CreateLendingHistoriesInVo from "../vo/CreateLendingHistoriesInVo";
import GetLendingHistoriesInVo from "../vo/GetLendingHistoriesInVo";
import GetLendingHistoriesOutVo from "../vo/GetLendingHistoriesOutVo";
import UpdateLendingHistoriesInVo from "../vo/UpdateLendingHistoriesInVo";

export interface ILendingHistoriesService {
  getLendingHistories(inVo: GetLendingHistoriesInVo): Promise<{total: number, results: GetLendingHistoriesOutVo[]}>
  createLendingHistories(inVo: CreateLendingHistoriesInVo): Promise<void>
  updateLendingHistories(inVo: UpdateLendingHistoriesInVo): Promise<void>
}