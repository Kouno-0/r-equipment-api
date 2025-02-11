/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { LendingHistoriesService } from 'src/services/LendingHistoriesService';
import { GetLendingHistoriesRequestQueryParam } from './request/GetLendingHistoriesRequestQueryParam';
import GetLendingHistoriesResponse from './response/GetLendingHistoriesResponse';
import GetLendingHistoriesInVo from 'src/services/vo/GetLendingHistoriesInVo';
import { CreateLendingHistoriesRequestBody } from './request/CreateLendingHistoriesRequestBody';
import { UpdateLendingHistoriesRequestBody } from './request/UpdateLendingHistoriesRequestBody';

@Controller('lending-histories')
export class LendingHistoriesController {
  constructor(private readonly service: LendingHistoriesService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetLendingHistoriesResponse })
    async getLendingHistories(@Query() query: GetLendingHistoriesRequestQueryParam ): Promise<GetLendingHistoriesResponse> {
      try{
        const inVo = plainToClass(GetLendingHistoriesInVo, query);
        const getLendingHistoriesResult: GetLendingHistoriesResponse = await this.service.getLendingHistories(inVo);
        return getLendingHistoriesResult;
      }
      catch(e){
        throw e;
      }
  }
  @Post('/lend')
  @ApiResponse({ status: 201 })
    async createLendingHistories(@Body() body: CreateLendingHistoriesRequestBody ): Promise<void> {
      try{
        await this.service.createLendingHistories(body);
      }
      catch(e){
        throw e;
      }
  }

  @Post('/return')
  @ApiResponse({ status: 201 })
    async updateLendingHistories(@Body() body: UpdateLendingHistoriesRequestBody ): Promise<void> {
      try{
        await this.service.updateLendingHistories(body);
      }
      catch(e){
        throw e;
      }
  }
}

