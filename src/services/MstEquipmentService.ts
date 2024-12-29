/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MstEquipmentRepository } from 'src/data/repository/MstEquipmentRepository';
import GetMstEquipmentCondition from 'src/data/repository/vo/GetMstEquipmentCondition';
import GetMstEquipmentOutVo from 'src/services/vo/GetMstEquipmentOutVo';
import GetMstEquipmentInVo from 'src/services/vo/GetMstEquipmentInVo';
import { IMstEquipmentService } from './interface/IMstEquipmentService';

@Injectable()
export class MstEquipmentService implements IMstEquipmentService{
  constructor(private readonly repository: MstEquipmentRepository) { }
    async getMstEquipment(inVo: GetMstEquipmentInVo): Promise<{total: number, results: GetMstEquipmentOutVo[]}>{
      const searchParam = plainToClass(GetMstEquipmentCondition, inVo)
      const total = await this.repository.countMstEquipment(searchParam);
      if(!total){
        return {total: 0, results: []};
      }

      const getMstEquipmentResult = await this.repository.fetchMstEquipment(searchParam);
      return {
        total,
        results: plainToClass(GetMstEquipmentOutVo, getMstEquipmentResult)
      }
    }
  }
