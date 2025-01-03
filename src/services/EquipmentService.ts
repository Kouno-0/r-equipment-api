/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import GetEquipmentInVo from './vo/GetEquipmentInVo';
import GetEquipmentOutVo from './vo/GetEquipmentOutVo';
import GetEquipmentCondition from 'src/data/repository/vo/GetEquipmentCondition';
import { EquipmentRepository } from 'src/data/repository/EquipmentRepository';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'
import { jstTimeZone } from 'src/common/const/timezone';

@Injectable()
export class EquipmentService {
  constructor(private readonly repository: EquipmentRepository) { }
    async getEquipment(inVo: GetEquipmentInVo): Promise<{total: number, results: GetEquipmentOutVo[]}>{
      const searchParam = plainToClass(GetEquipmentCondition, inVo)
      const total = await this.repository.countEquipment(searchParam);
      if(!total){
        return {total: 0, results: []};
      }

      // ページ数 > 指定したページ番号 であるかをチェック
      if(inVo.pageNumber && Number(inVo.pageNumber) > Math.ceil(total /Number(inVo.count)) ){
        console.log(Math.ceil(total /Number(inVo.count)));
        throw new Error('指定されたページ番号が不正です。');
      }

      const getEquipmentResult = await this.repository.fetchEquipment(searchParam);
      // 購入日をJST(YYY-MM-DD)形式に変換
      getEquipmentResult.forEach( e => {
    if (e.purchaseDate) {
      const jstDate = toZonedTime(e.purchaseDate, jstTimeZone);
      e.purchaseDate = format(jstDate, 'yyyy-MM-dd');
    }})
      return {
        total,
        results: plainToClass(GetEquipmentOutVo, getEquipmentResult)
      }
    }
  }

