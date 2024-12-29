/* eslint-disable prettier/prettier */
import { MstEquipment } from '../entity/MstEquipmentEntity';
import { IMstEquipmentRepository } from './interface/IMstEquipmentRepository';
import GetMstEquipmentCondition from './vo/GetMstEquipmentCondition';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class MstEquipmentRepository extends Repository<MstEquipment> implements IMstEquipmentRepository{
  constructor(private dataSource: DataSource) {
    super(MstEquipment, dataSource.createEntityManager());
  }

  // エイリアスとカラム名の静的プロパティ
  static readonly ALIAS = 'MstEquipment';
  static readonly COLNAMES = {
    COLUMN_EQUIPMENT_CATEGORY_ID: 'equipment_category_id',
    COLUMN_EQUIPMENT_CATEGORY_NAME_1: 'equipment_category_name1',
    COLUMN_EQUIPMENT_CATEGORY_NAME_2: 'equipment_category_name2',
  };

  async countMstEquipment(searchParam: GetMstEquipmentCondition): Promise<number> {
    const query = this.createQueryBuilder(MstEquipmentRepository.ALIAS);
    this.setWhere(query, searchParam);
    return await query.getCount();
  }

  async fetchMstEquipment(searchParam: GetMstEquipmentCondition): Promise<MstEquipment[]> {
    const query = this.createQueryBuilder(MstEquipmentRepository.ALIAS);
    this.setWhere(query, searchParam);
    
    query.orderBy(
      `${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_ID}`,
      'ASC',
    );

    return await query.getMany();
  }

    // where句を共通化するメソッド
    private setWhere(query: SelectQueryBuilder<MstEquipment>, searchParam: GetMstEquipmentCondition): SelectQueryBuilder<MstEquipment> {
      if (searchParam.equipmentCategoryId) {
        query.andWhere(
          `${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_ID} = :equipment_category_id`,
          { equipment_category_id: searchParam.equipmentCategoryId },
        );
      }
  
      if (searchParam.equipmentCategoryName1) {
        query.andWhere(
          `${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_NAME_1} = :equipment_category_name_1`,
          { equipment_category_name_1: searchParam.equipmentCategoryName1 },
        );
      }
  
      if (searchParam.equipmentCategoryName2) {
        query.andWhere(
          `${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_NAME_2} = :equipment_category_name_2`,
          { equipment_category_name_2: searchParam.equipmentCategoryName2 },
        );
      }
      return query;
    }
}
