/* eslint-disable prettier/prettier */
import CreateLendingHistoriesCondition from '../vo/CreateLendingHistoriesCondition';
import GetLendingHistoriesCondition from '../vo/GetLendingHistoriesCondition';
import UpdateLendingHistoriesCondition from '../vo/UpdateLendingHistoriesCondition';
import { LendingHistoriesDto } from '../vo/dto/GetLendingHistoriesOutDto';

export interface ILendingHistoriesRepository {
  countLendingHistories(searchParam: GetLendingHistoriesCondition): Promise<number>
  fetchLendingHistories(searchParam: GetLendingHistoriesCondition): Promise<LendingHistoriesDto[]>
  createLendingHistories(searchParam: CreateLendingHistoriesCondition): Promise<void>
  updateLendingHistories(searchParam: UpdateLendingHistoriesCondition): Promise<void>
}
