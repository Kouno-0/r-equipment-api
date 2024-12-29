/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';


import GetMstPositionResponse from './response/GetMstPositionResponse';
import GetMstPositionRequestQueryParam from './request/GetMstPositionRequestQueryParam';
import { MstPositionService } from 'src/services/MstPositionService';
import GetMstPositionInVo from 'src/services/vo/GetMstPositionInVo';

@ApiTags('mst-position')
@Controller('mst-position')
export class MstPositionController {
  constructor(private readonly service: MstPositionService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetMstPositionResponse })
    async getMstPosition(@Query() query: GetMstPositionRequestQueryParam ): Promise<GetMstPositionResponse> {
      const inVo = plainToClass(GetMstPositionInVo, query);
      const getMstPositionResult: GetMstPositionResponse = await this.service.getMstPosition(inVo);
        return getMstPositionResult;
  }
}