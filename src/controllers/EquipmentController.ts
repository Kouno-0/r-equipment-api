/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { EquipmentService } from 'src/services/EquipmentService';
import { GetEquipmentRequestQueryParam } from './request/GetEquipmentRequestQueryParam';
import { GetEquipmentResponse } from './response/GetEquipmentResponse';
import GetEquipmentInVo from 'src/services/vo/GetEquipmentInVo';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly service: EquipmentService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetEquipmentResponse })
    async getEquipment(@Query() query: GetEquipmentRequestQueryParam ): Promise<GetEquipmentResponse> {
      const inVo = plainToClass(GetEquipmentInVo, query);
      const getEquipmentResult: GetEquipmentResponse = await this.service.getEquipment(inVo);
        return getEquipmentResult;
  }
}