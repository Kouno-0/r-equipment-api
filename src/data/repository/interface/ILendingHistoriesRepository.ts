/* eslint-disable prettier/prettier */
import GetLendingHistoriesCondition from '../vo/GetLendingHistoriesCondition';
import { LendingHistoriesDto } from '../vo/dto/GetLendingHistoriesOutDto';

export interface ILendingHistoriesRepository {
  countLendingHistories(searchParam: GetLendingHistoriesCondition): Promise<number>
  fetchLendingHistories(searchParam: GetLendingHistoriesCondition): Promise<LendingHistoriesDto[]>
}
