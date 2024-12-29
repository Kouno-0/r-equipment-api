/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { GetMstEquipmentResponse } from 'src/controllers/response/GetMstEquipmentResponse';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MstEquipmentService } from 'src/services/MstEquipmentService';
import GetMstEquipmentInVo from 'src/services/vo/GetMstEquipmentInVo';
import GetMstEquipmentRequestQueryParam from './request/GetMstUniversityRequestQueryParam';

@ApiTags('mst-equipment')
@Controller('mst-equipment')
export class MstEquipmentController {
  constructor(private readonly service: MstEquipmentService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetMstEquipmentResponse })
    async getMstEquipment(@Query() query: GetMstEquipmentRequestQueryParam ): Promise<GetMstEquipmentResponse> {
      const inVo = plainToClass(GetMstEquipmentInVo, query);
      const getMstEquipmentResult: GetMstEquipmentResponse = await this.service.getMstEquipment(inVo);
        return getMstEquipmentResult;
  }
}