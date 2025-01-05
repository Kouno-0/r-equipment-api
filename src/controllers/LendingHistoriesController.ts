/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { LendingHistoriesService } from 'src/services/LendingHistoriesService';
import { GetLendingHistoriesRequestQueryParam } from './request/GetLendingHistoriesRequestQueryParam';
import GetLendingHistoriesResponse from './response/GetLendingHistoriesResponse';
import GetLendingHistoriesInVo from 'src/services/vo/GetLendingHistoriesInVo';

@Controller('lending-histories')
export class LendingHistoriesController {
  constructor(private readonly service: LendingHistoriesService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetLendingHistoriesResponse })
    async getLendingHistories(@Query() query: GetLendingHistoriesRequestQueryParam ): Promise<GetLendingHistoriesResponse> {
      const inVo = plainToClass(GetLendingHistoriesInVo, query);
      const getLendingHistoriesResult: GetLendingHistoriesResponse = await this.service.getLendingHistories(inVo);
        return getLendingHistoriesResult;
  }
}

