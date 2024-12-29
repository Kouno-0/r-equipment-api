/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MstUniversityRepository } from 'src/data/repository/MstUniversityRepository';
import GetMstUniversityCondition from 'src/data/repository/vo/GetMstUniversityCondition';
import GetMstUniversityInVo from './vo/GetMstUniversityInVo';
import GetMstUniversityOutVo from './vo/GetMstUniversityOutVo';
import { IMstUniversityService } from './interface/IMstUniversityService';
@Injectable()
export class MstUniversityService implements IMstUniversityService {
  constructor(private readonly repository: MstUniversityRepository) { }
    async getMstUniversity(inVo: GetMstUniversityInVo): Promise<{total: number, results: GetMstUniversityOutVo[]}>{
      const searchParam = plainToClass(GetMstUniversityCondition, inVo)
      const total = await this.repository.countMstUniversity(searchParam);
      if(!total){
        return {total: 0, results: []};
      }

      const getMstUniversityResult = await this.repository.fetchMstUniversity(searchParam);
      return {
        total,
        results: plainToClass(GetMstUniversityOutVo, getMstUniversityResult)
      }
    }
  }
