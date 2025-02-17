/* eslint-disable prettier/prettier */
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LendingHistories } from '../entity/LendingHistoriesEntity';
import GetLendingHistoriesCondition from './vo/GetLendingHistoriesCondition';
import { ILendingHistoriesRepository } from './interface/ILendingHistoriesRepository';
import { EquipmentRepository } from './EquipmentRepository';
import { UsersRepository } from './UsersRepository';
import { LendingHistoriesDto } from './vo/dto/GetLendingHistoriesOutDto';
import { MstUniversityRepository } from './MstUniversityRepository';
import UpdateLendingHistoriesCondition from './vo/UpdateLendingHistoriesCondition';
import CreateLendingHistoriesCondition from './vo/CreateLendingHistoriesCondition';


@Injectable()
export class LendingHistoriesRepository extends Repository<LendingHistories> implements ILendingHistoriesRepository {
  constructor(private dataSource: DataSource) {
    super(LendingHistories, dataSource.createEntityManager());
  }

  static readonly ALIAS = 'LendingHistories';
  static readonly COLNAMES = {
    COLUMN_LENDING_ID: 'lending_id',
    COLUMN_EQUIPMENT_ID: 'equipment_id',
    COLUMN_LEND_USER_ID: 'lend_user_id',
    COLUMN_LENDING_DATE: 'lending_date',
    COLUMN_USE_FROM: 'use_from',
    COLUMN_USE_TO: 'use_to',
    COLUMN_RETURN_USER_ID: 'return_user_id',
    COLUMN_RETURN_DATE: 'return_date',
    COLUMN_RETURN_PLACE_ID: 'return_place_id',
    COLUMN_RETURN_PLACE_OTHER: 'return_place_other',
    COLUMN_DESTINATION: 'destination',
    COLUMN_CREATE_DATE: 'create_date',
    COLUMN_UPDATE_DATE: 'update_date',
  };

  async countLendingHistories(searchParam: GetLendingHistoriesCondition): Promise<number> {
    const query = this.createQueryBuilder(LendingHistoriesRepository.ALIAS);
    this.setJoin(query);
    this.setWhere(query, searchParam);
    return await query.getCount();
  }

  async fetchLendingHistories(searchParam: GetLendingHistoriesCondition): Promise<LendingHistoriesDto[]> {
    const query = this.createQueryBuilder(LendingHistoriesRepository.ALIAS);
    query.select(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LENDING_ID}`,'lendingId');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_EQUIPMENT_ID}`,'equipmentId');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LENDING_DATE}`,'lendingDate');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LEND_USER_ID}`,'lendUserId');
    query.addSelect(`CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME})`,'lendUserName');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_USE_FROM}`,'useFrom');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_USE_TO}`,'useTo');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_DESTINATION}`,'destination');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_USER_ID}`,'returnUserId');
    query.addSelect(`CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME})`,'returnUserName');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_USE_FROM}`,'useFrom');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_DATE}`,'returnDate');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_PLACE_ID}`,'returnPlaceId');
    query.addSelect(
      `COALESCE(${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_PLACE_OTHER}, ${MstUniversityRepository.ALIAS}.${MstUniversityRepository.COLNAMES.COLUMN_UNIVERSITY_NAME})`,
      'returnPlaceName',
    );
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_ID}`,'categoryId');
    query.addSelect(`${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_NAME}`,'equipmentName');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_CREATE_DATE}`,'createDate');
    query.addSelect(`${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_UPDATE_DATE}`,'updateDate');

    this.setJoin(query);
    this.setWhere(query, searchParam);

    query.orderBy(
      searchParam.sort, searchParam.direction,
    );

    if(searchParam.count){
      query.limit(searchParam.count)
    }

    if(searchParam.pageNumber){
      query.offset(searchParam.count * (searchParam.pageNumber - 1 ))
    }

    return await query.getRawMany();
  }

  private setJoin(query: SelectQueryBuilder<LendingHistories>): SelectQueryBuilder<LendingHistories> {
    query.leftJoin(`${LendingHistoriesRepository.ALIAS}.equipment`, EquipmentRepository.ALIAS);
    query.leftJoin(`${LendingHistoriesRepository.ALIAS}.user`, UsersRepository.ALIAS);
    query.leftJoin(`${LendingHistoriesRepository.ALIAS}.returnPlace`, MstUniversityRepository.ALIAS);
    return query;
  }
  private setWhere(query: SelectQueryBuilder<LendingHistories>, searchParam: GetLendingHistoriesCondition): SelectQueryBuilder<LendingHistories> {
    if (searchParam.lendingId) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LENDING_ID} = :lending_id`,
        { lending_id: searchParam.lendingId },
      );
    }
    if (searchParam.equipmentId) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_ID} = :equipment_id`,
        { equipment_id: searchParam.equipmentId },
      );
    }
    if (searchParam.equipmentCategoryId) {
      query.andWhere(
        `${EquipmentRepository.ALIAS}.${EquipmentRepository.COLNAMES.COLUMN_EQUIPMENT_CATEGORY_ID} = :equipment_category_id`,
        { equipment_category_id: searchParam.equipmentCategoryId },
      );
    }
    if (searchParam.lendUserId) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LEND_USER_ID} = :lend_user_id`,
        { lend_user_id: searchParam.lendUserId },
      );
    }
    if (searchParam.lendFrom) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LENDING_DATE} >= :lend_from`,
        { lend_from: searchParam.lendFrom },
      );
    }
    if (searchParam.lendTo) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_LENDING_DATE} <= :lend_to`,
        { lend_to: searchParam.lendTo },
      );
    }
    if (searchParam.useFrom) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_USE_FROM} >= :use_from`,
        { use_from: searchParam.useFrom },
      );
    }
    if (searchParam.useTo) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_USE_TO} <= :use_to`,
        { use_to: searchParam.useTo },
      );
    }
    if (searchParam.lendUserNameKana) {
      query.andWhere(
        `CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME_KANA}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME_KANA}) LIKE :lend_user_name_kana`,
        { lend_user_name_kana: `${searchParam.lendUserNameKana}%` },
      );
    }
    if (searchParam.returnUserId) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_USER_ID} = :return_user_id`,
        { return_user_id: searchParam.returnUserId },
      );
    }
    if (searchParam.returnUserNameKana) {
      query.andWhere(
        `CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME_KANA}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME_KANA}) LIKE :return_user_name_kana`,
        { return_user_name_kana: `${searchParam.returnUserNameKana}%` },
      );
    }
    switch(searchParam.statusCd){
      case '01': // 持出中
        query.andWhere(
          `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_DATE} IS NULL`,
        );
        break;
      case '00': // 持出可
        query.andWhere(
          `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_DATE} IS NOT NULL`,
        );
        break;
        default:
          break;
    }
    if (searchParam.returnPlaceId) {
      query.andWhere(
        `${LendingHistoriesRepository.ALIAS}.${LendingHistoriesRepository.COLNAMES.COLUMN_RETURN_PLACE_ID} = :return_place_id`,
        { return_place_id: searchParam.returnPlaceId },
      );
    }
    return query;
  }

  async createLendingHistories(searchParam: CreateLendingHistoriesCondition): Promise<void> {
    const lendingHistory = new LendingHistories();
    lendingHistory.equipment_id = searchParam.equipmentId;
    lendingHistory.lend_user_id = searchParam.lendUserId;
    lendingHistory.lending_date = new Date(searchParam.lendDate);
    lendingHistory.use_from = new Date(searchParam.useFrom);
    lendingHistory.use_to = new Date(searchParam.useTo);
    lendingHistory.destination = searchParam.destination;
    lendingHistory.return_user_id = null;
    lendingHistory.return_date = null;
    lendingHistory.return_place_id = null;
    await lendingHistory.save(); 
  }

  async updateLendingHistories(searchParam: UpdateLendingHistoriesCondition): Promise<void> {
    const query = this.createQueryBuilder(LendingHistoriesRepository.ALIAS);
    await query
      .update(LendingHistories)
      .set({
        return_user_id: searchParam.returnUserId,
        return_date: searchParam.returnDate,
        return_place_id: searchParam.returnPlaceId,
        return_place_other: searchParam.returnPlaceOther ? searchParam.returnPlaceOther : null
      })
      .where("lending_id = :lendingId", { lendingId: searchParam.lendingId }) 
      .execute();
  }

}

