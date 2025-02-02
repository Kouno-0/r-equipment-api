/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import GetLendingHistoriesInVo from './vo/GetLendingHistoriesInVo';
import GetLendingHistoriesOutVo from './vo/GetLendingHistoriesOutVo';
import GetLendingHistoriesCondition from 'src/data/repository/vo/GetLendingHistoriesCondition';
import { LendingHistoriesRepository } from 'src/data/repository/LendingHistoriesRepository';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'
import { jstTimeZone } from 'src/common/const/timezone';
import GetMstEquipmentInVo from './vo/GetMstEquipmentInVo';
import { MstEquipmentService } from './MstEquipmentService';
import GetMstUniversityInVo from './vo/GetMstUniversityInVo';
import { MstUniversityService } from './MstUniversityService';

@Injectable()
export class LendingHistoriesService {
  constructor(private readonly repository: LendingHistoriesRepository, private readonly mstEquipmentService: MstEquipmentService, private readonly mstUniversityService: MstUniversityService,) { }
    async getLendingHistories(inVo: GetLendingHistoriesInVo): Promise<{total: number, results: GetLendingHistoriesOutVo[]}>{

      // 区分値チェック
      const getMstEquipmentInVo : GetMstEquipmentInVo = { equipmentCategoryId: inVo.equipmentCategoryId};
      const getMstUniversityInVo : GetMstUniversityInVo = { universityId: inVo.returnPlaceId};

      try{
        const getMstEquipmentResult = await this.mstEquipmentService.getMstEquipment(getMstEquipmentInVo);
        const getMstUniversityResult = await this.mstUniversityService.getMstUniversity(getMstUniversityInVo);
      if(!getMstEquipmentResult.total){
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: '装備カテゴリIDが不正な値です',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if(!getMstUniversityResult.total){
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: '返却場所IDが不正な値です',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      } catch(e) {
        throw e;
      }

      const searchParam = plainToClass(GetLendingHistoriesCondition, inVo)
      const total = await this.repository.countLendingHistories(searchParam);
      if(!total){
        return {total: 0, results: []};
      }

      // ページ数 > 指定したページ番号 であるかをチェック
      if(inVo.pageNumber && Number(inVo.pageNumber) > Math.ceil(total /Number(inVo.count)) ){
        console.log(Math.ceil(total /Number(inVo.count)));
        throw new Error('指定されたページ番号が不正です。');
      }

      const getLendingHistoriesResult = await this.repository.fetchLendingHistories(searchParam);
      // 日付をJST(YYY-MM-DD)形式に変換
      getLendingHistoriesResult.forEach( e => {
        if (e.lendingDate) {
          e.lendingDate = format(toZonedTime(e.lendingDate, jstTimeZone), 'yyyy-MM-dd');
        }

        if (e.useFrom) {
          e.useFrom = format(toZonedTime(e.useFrom, jstTimeZone), 'yyyy-MM-dd');
        }

        if (e.useTo) {
          e.useTo = format(toZonedTime(e.useTo, jstTimeZone), 'yyyy-MM-dd');
        }

        if (e.returnDate) {
          e.returnDate = format(toZonedTime(e.returnDate, jstTimeZone), 'yyyy-MM-dd');
        }
  
      })
      return {
        total,
        results: plainToClass(GetLendingHistoriesOutVo, getLendingHistoriesResult)
      }
    }
  }

