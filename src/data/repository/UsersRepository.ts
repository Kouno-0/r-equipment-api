/* eslint-disable prettier/prettier */
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from '../entity/UsersEntity';
import GetUsersCondition from './vo/GetMstUsersCondition';
import { IUsersRepository } from './interface/IUsersRepository';
import { MstPositionRepository } from './MstPositionRepository';
import { MstUniversityRepository } from './MstUniversityRepository';
import { UserDto } from './vo/dto/GetUsersOutDto';


@Injectable()
export class UsersRepository extends Repository<Users> implements IUsersRepository {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  static readonly ALIAS = 'Users';
  static readonly COLNAMES = {
    COLUMN_USER_ID: 'user_id',
    COLUMN_TERM: 'term',
    COLUMN_USER_LAST_NAME: 'user_last_name',
    COLUMN_USER_FIRST_NAME: 'user_first_name',
    COLUMN_USER_LAST_NAME_KANA: 'user_last_name_kana',
    COLUMN_USER_FIRST_NAME_KANA: 'user_first_name_kana',
    COLUMN_UNIVERSITY_ID: 'university_id',
    COLUMN_UNIVERSITY_OTHER: 'university_other',
    COLUMN_POSITION_ID: 'position_id',
    COLUMN_MAIL_ADDRESS: 'mail_address',
    COLUMN_CREATE_DATE: 'create_date',
    COLUMN_UPDATE_DATE: 'update_date',
  };

  async countUsers(searchParam: GetUsersCondition): Promise<number> {
    const query = this.createQueryBuilder(UsersRepository.ALIAS);
    console.log("件数確認");
    this.setJoin(query);
    this.setWhere(query, searchParam);
    return await query.getCount();
  }

  async fetchUsers(searchParam: GetUsersCondition): Promise<UserDto[]> {
    console.log("取得処理");
    const query = this.createQueryBuilder(UsersRepository.ALIAS);
    query.select(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_ID}`,'userId');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_TERM}`,'term');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME}`,'userLastName');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME}`,'userFirstName');
    query.addSelect(`CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME})`,'userName');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME_KANA}`,'userLastNameKana');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME_KANA}`,'userFirstNameKana');
    query.addSelect(`CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME_KANA}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME_KANA})`,'userNameKana');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_UNIVERSITY_ID}`,'universityId');
    query.addSelect(
      `COALESCE(${MstUniversityRepository.ALIAS}.${MstUniversityRepository.COLNAMES.COLUMN_UNIVERSITY_NAME}, ${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_UNIVERSITY_OTHER})`,
      'universityName',
    );
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_POSITION_ID}`,'positionId');
    query.addSelect(`${MstPositionRepository.ALIAS}.${MstPositionRepository.COLNAMES.COLUMN_POSITION_NAME}`,'positionName');
    query.addSelect(`${MstPositionRepository.ALIAS}.${MstPositionRepository.COLNAMES.COLUMN_IS_MANAGER}`,'isManager');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_MAIL_ADDRESS}`,'mailAddress');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_CREATE_DATE}`,'createDate');
    query.addSelect(`${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_UPDATE_DATE}`,'updateDate');

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

  private setJoin(query: SelectQueryBuilder<Users>): SelectQueryBuilder<Users> {
    query.leftJoin(`${UsersRepository.ALIAS}.position`, MstPositionRepository.ALIAS);
    query.leftJoin(`${UsersRepository.ALIAS}.university`, MstUniversityRepository.ALIAS);
    return query;
  }

    private setWhere(query: SelectQueryBuilder<Users>, searchParam: GetUsersCondition): SelectQueryBuilder<Users> {
      if (searchParam.userId) {
        query.andWhere(
          `${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_ID} = :user_id`,
          { user_id: searchParam.userId },
        );
      }
      if (searchParam.term) {
        query.andWhere(
          `${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_TERM} = :term`,
          { term: searchParam.term },
        );
      }
      if (searchParam.universityId) {
        query.andWhere(
          `${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_UNIVERSITY_ID} = :university_id`,
          { university_id: searchParam.universityId },
        );
      }
      if (searchParam.positionId) {
        query.andWhere(
          `${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_POSITION_ID} = :position_id`,
          { position_id: searchParam.positionId },
        );
      }
      if (searchParam.mailAddress) {
        query.andWhere(
          `${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_MAIL_ADDRESS} LIKE :mail_address`,
          { mail_address: `${searchParam.mailAddress}%` },
        );
      }
      if (searchParam.mailAddress) {
        query.andWhere(
          `CONCAT(${UsersRepository.ALIAS}.${UsersRepository.COLNAMES.COLUMN_USER_LAST_NAME_KANA}, ${UsersRepository.COLNAMES.COLUMN_USER_FIRST_NAME_KANA}) LIKE :user_name_kana`,
          { user_name_kana: `${searchParam.userNameKana}%` },
        );
      }
      return query;
    }

}

