/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import GetMstUniversityRequestQueryParam from './request/GetMstUniversityRequestQueryParam';
import { GetMstUniversityResponse } from './response/GetMstUniversityResponse';

import GetMstUniversityInVo from 'src/services/vo/GetMstUniversityInVo';
import { MstUniversityService } from 'src/services/MstUniversityService';

@ApiTags('mst-university')
@Controller('mst-university')
export class MstUniversityController {
  constructor(private readonly service: MstUniversityService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetMstUniversityResponse })
    async getMstUniversity(@Query() query: GetMstUniversityRequestQueryParam ): Promise<GetMstUniversityResponse> {
      const inVo = plainToClass(GetMstUniversityInVo, query);
      const getMstUniversityResult: GetMstUniversityResponse = await this.service.getMstUniversity(inVo);
        return getMstUniversityResult;
  }
}