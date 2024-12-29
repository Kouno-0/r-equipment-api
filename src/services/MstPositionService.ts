/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MstPositionRepository } from 'src/data/repository/MstPositionRepository';
import GetMstPositionCondition from 'src/data/repository/vo/GetMstPositionCondition';
import GetMstPositionInVo from './vo/GetMstPositionInVo';
import GetMstPositionOutVo from './vo/GetMstPositionOutVo';
import { IMstPositionService } from './interface/IMstPositionService';
@Injectable()
export class MstPositionService implements IMstPositionService{
  constructor(private readonly repository: MstPositionRepository) { }
    async getMstPosition(inVo: GetMstPositionInVo): Promise<{total: number, results: GetMstPositionOutVo[]}>{
      const searchParam = plainToClass(GetMstPositionCondition, inVo)
      const total = await this.repository.countMstPosition(searchParam);
      if(!total){
        return {total: 0, results: []};
      }

      const getMstPositionResult = await this.repository.fetchMstPosition(searchParam);
      return {
        total,
        results: plainToClass(GetMstPositionOutVo, getMstPositionResult)
      }
    }
  }
