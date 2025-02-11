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
import { EquipmentService } from './EquipmentService';
import { UsersService } from './UsersService';
import GetEquipmentInVo from './vo/GetEquipmentInVo';
import GetUsersInVo from './vo/GetUsersInVo';
import CreateLendingHistoriesInVo from './vo/CreateLendingHistoriesInVo';
import UpdateLendingHistoriesInVo from './vo/UpdateLendingHistoriesInVo';
import UpdateLendingHistoriesCondition from 'src/data/repository/vo/UpdateLendingHistoriesCondition';
import CreateLendingHistoriesCondition from 'src/data/repository/vo/CreateLendingHistoriesCondition';
import UpdateEquipmentInVo from './vo/UpdateEquipmentInVo';

@Injectable()
export class LendingHistoriesService {
  returnPlaceOther = 'U04';
  equipmentStatusAvailable = '00';
  equipmentStatusUnavailable = ['01', '02'];

  constructor(
    private readonly repository: LendingHistoriesRepository, 
    private readonly mstEquipmentService: MstEquipmentService, 
    private readonly mstUniversityService: MstUniversityService,
    private readonly equipmentService: EquipmentService, 
    private readonly usersService: UsersService,
  ) { }
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

    async createLendingHistories(inVo: CreateLendingHistoriesInVo): Promise<void> {
      try {
        // 装備ID & 会員IDの存在チェック
        await this.validateEquipmentAndUser(inVo.equipmentId, inVo.lendUserId);
    
        // 貸出可能かチェック
        const getLendingHistoriesInVo: GetLendingHistoriesInVo = { count: 1, pageNumber: 1, equipmentId: inVo.equipmentId, statusCd: '01', sort: 'lendingDate',  direction: 'DESC' };
        const getLendingHistoriesResult = await this.repository.fetchLendingHistories(getLendingHistoriesInVo);
        if (getLendingHistoriesResult.length > 0) {
          if (!getLendingHistoriesResult[0]?.returnDate && inVo.isHandOver) {
              // 直接受け渡しのため返却処理を実行してから貸出処理を行う
              const updateParam :UpdateLendingHistoriesCondition = {
                lendingId: getLendingHistoriesResult[0].lendingId,
                returnUserId: inVo.lendUserId,
                returnDate: inVo.lendDate,
                returnPlaceId: this.returnPlaceOther,
                returnPlaceOther: `${inVo.lendUserId}に直接受け渡し`,
                equipmentStatusCd: this.equipmentStatusAvailable
              }
                await this.repository.updateLendingHistories(updateParam);
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Bad Request',
                  message: '指定した装備は貸出中です',
                },
                HttpStatus.BAD_REQUEST
              );
            }
          
        }

        // 貸出履歴登録処理
        console.log("貸出履歴登録処理");
        const insertParam :CreateLendingHistoriesCondition = plainToClass(CreateLendingHistoriesCondition, inVo)
        await this.repository.createLendingHistories(insertParam);
        
      } catch (e) {
        throw e;
      }
    }
    

    async updateLendingHistories(inVo: UpdateLendingHistoriesInVo): Promise<void> {
      try {
        await this.validateEquipmentAndUser(inVo.equipmentId, inVo.returnUserId);
        // 更新対象の貸出履歴を取得
        const getLendingHistoriesInVo: GetLendingHistoriesInVo = {
          count: 1,
          pageNumber: 1,
          equipmentId: inVo.equipmentId,
          statusCd: '01',
          sort: 'lendingId',
          direction: 'DESC'
        };

        const getLendingHistoriesResult = await this.getLendingHistories(getLendingHistoriesInVo);

        if (!getLendingHistoriesResult.total) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Not Found',
              message: '指定した装備は現在貸出されていません',
            },
            HttpStatus.BAD_REQUEST
          );
        }

        // 返却処理(装備貸出履歴の更新)
        const updateParam: UpdateLendingHistoriesCondition = plainToClass(UpdateLendingHistoriesCondition, {
          ...inVo,
          lendingId: getLendingHistoriesResult.results[0].lendingId,
        });
        await this.repository.updateLendingHistories(updateParam);

        // 破損や行方不明など装備が使用不能になった場合、装備テーブルを更新
        if (this.equipmentStatusUnavailable.includes(inVo.statusCd)) {
          const updateEquipmentInVo: UpdateEquipmentInVo = {
            equipmentId: inVo.equipmentId,
            statusCd: inVo.statusCd,
            remark: inVo.remark
          };
          await this.equipmentService.updateEquipment(updateEquipmentInVo);
        }
      } catch (e) {
        throw e;
      }
    }

    async validateEquipmentAndUser(equipmentId: string, userId: string): Promise<void> {
      const getEquipmentInVo: GetEquipmentInVo = { count: 0, pageNumber: 1, equipmentId, direction: 'ASC' };
      const getUsersInVo: GetUsersInVo = { count: 0, pageNumber: 1, userId, direction: 'ASC' };
      const [getEquipmentResult, getUserResult] = await Promise.all([
        this.equipmentService.getEquipment(getEquipmentInVo),
        this.usersService.getUsers(getUsersInVo)
      ]);
    
      if (!getEquipmentResult.total) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: '指定した装備が見つかりません',
          },
          HttpStatus.NOT_FOUND
        );
      }
      if(getEquipmentResult.results[0].statusCd in this.equipmentStatusUnavailable) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: '指定した装備は使用不可です',
          },
          HttpStatus.NOT_FOUND
        );
      }
    
      if (!getUserResult.total) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: '指定した会員が見つかりません',
          },
          HttpStatus.NOT_FOUND
        );
      }
    }
  }