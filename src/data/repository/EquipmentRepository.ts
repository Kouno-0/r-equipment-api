/* eslint-disable prettier/prettier */
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Equipment } from '../entity/EquipmentEntity';
import GetEquipmentCondition from './vo/GetEquipmentCondition';
import { IEquipmentRepository } from './interface/IEquipmentRepository';
import { MstEquipmentRepository } from './MstEquipmentRepository';
import { MstTypeRepository } from './MstTypeRepository';
import { EquipmentDto } from './vo/dto/GetEquipmentDto';
import { MstType } from '../entity/MstTypeEntity';


@Injectable()
export class EquipmentRepository extends Repository<Equipment> implements IEquipmentRepository {
  constructor(private dataSource: DataSource) {
    super(Equipment, dataSource.createEntityManager());
  }

  static readonly ALIAS = 'Equipment';
  static readonly COLNAMES = {
    COLUMN_EQUIPMENT_ID: 'equipment_id',
    COLUMN_EQUIPMENT_CATEGORY_ID: 'category_id',
    COLUMN_EQUIPMENT_NAME: 'equipment_name',
    COLUMN_PURCHASE_DATE: 'purchase_date',
    COLUMN_EQUIPMENT_STATE_CD: 'equipment_state_cd',
    COLUMN_STORE_PLACE_CD: 'store_place_cd',
    COLUMN_SUMMARY: 'summary',
    COLUMN_REMARK: 'remark',
    COLUMN_CREATE_DATE: 'create_date',
    COLUMN_UPDATE_DATE: 'update_date',
  };

  async countEquipment(searchParam: GetEquipmentCondition): Promise<number> {
    const query = this.createQueryBuilder(EquipmentRepository.ALIAS);
    this.setJoin(query);
    this.setWhere(query, searchParam);
    return await query.getCount();
  }

  async fetchEquipment(searchParam: GetEquipmentCondition): Promise<EquipmentDto[]> {
    const query = this.createQueryBuilder(EquipmentRepository.ALIAS);
    query.select(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_ID}`, 'equipmentId');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_ID}`, 'categoryId');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_NAME}`, 'equipmentName');
    query.addSelect(
      `CASE 
          WHEN ${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_NAME_2} IS NOT NULL 
          THEN CONCAT(${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_NAME_1}, '(', ${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_NAME_2}, ')') 
          ELSE ${MstEquipmentRepository.ALIAS}.${MstEquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_NAME_1} 
        END`,
      'equipmentCategoryName',
    );
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_PURCHASE_DATE}`, 'purchaseDate');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_STATE_CD}`, 'equipmentStateCd');
    query.addSelect(`mstEquipmentStateType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_NAME}`, 'equipmentState');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_STORE_PLACE_CD}`, 'storePlaceCd');
    query.addSelect(`mstStorePlaceType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_NAME}`, 'storePlace');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_SUMMARY}`, 'summary');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_REMARK}`, 'remark');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_CREATE_DATE}`, 'createDate');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_UPDATE_DATE}`, 'updateDate');

    this.setJoin(query);
    this.setWhere(query, searchParam);

    query.orderBy(
      searchParam.sort, searchParam.direction,
    );

    if (searchParam.count) {
      query.limit(searchParam.count)
    }

    if (searchParam.pageNumber) {
      query.offset(searchParam.count * (searchParam.pageNumber - 1))
    }

    return await query.getRawMany();

  }

  private setJoin(query: SelectQueryBuilder<Equipment>): SelectQueryBuilder<Equipment> {
    query.leftJoin(`${EquipmentRepository.ALIAS}.mstEquipment`, MstEquipmentRepository.ALIAS);
    query.leftJoin(
      MstType,
      'mstEquipmentStateType',
      `mstEquipmentStateType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_CD} = ${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_STATE_CD}
      AND mstEquipmentStateType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_KBN} = 'equipmentState'`
    );
    query.leftJoin(
      MstType,
      'mstStorePlaceType',
      `mstStorePlaceType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_CD} = ${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_STORE_PLACE_CD}
      AND mstStorePlaceType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_KBN} = 'storePlace'`
    );
    return query;
  }

  private setWhere(query: SelectQueryBuilder<Equipment>, searchParam: GetEquipmentCondition): SelectQueryBuilder<Equipment> {
    if (searchParam.equipmentId) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_ID} LIKE :equipment_id`,
        { equipment_id: `${searchParam.equipmentId}%` },
      );
    }
    if (searchParam.equipmentCategoryId) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_ID} LIKE  :equipment_category_id`,
        { equipment_category_id: `${searchParam.equipmentCategoryId}%` },
      );
    }
    if (searchParam.purchaseDateFrom) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_PURCHASE_DATE} >= :purchase_date_from`,
        { purchase_date_from: searchParam.purchaseDateFrom },
      );
    }
    if (searchParam.purchaseDateTo) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_PURCHASE_DATE} <= :purchase_date_to`,
        { purchase_date_to: searchParam.purchaseDateTo },
      );
    }
    if (searchParam.equipmentStateCd) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_STATE_CD} = :equipment_state_cd`,
        { equipment_state_cd: searchParam.equipmentStateCd },
      );
      // query.andWhere(
      //   `mstEquipmentStateType.${MstTypeRepository.COLNAMES.COLUMN_TYPE_KBN} = :equipment_state`,
      //   { equipment_state: 'equipmentState' },
      // );
    }
    if (searchParam.storePlaceCd) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_STORE_PLACE_CD} = :store_place_cd`,
        { store_place_cd: searchParam.storePlaceCd },
      );
      // query.andWhere(
      //   `${MstTypeRepository.ALIAS}.${MstTypeRepository.COLNAMES.COLUMN_TYPE_KBN} = :store_place`,
      //   { store_place: 'storePlace' },
      // );
    }

    return query;
  }

}

