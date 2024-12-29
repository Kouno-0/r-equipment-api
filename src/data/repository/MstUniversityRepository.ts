/* eslint-disable prettier/prettier */
import { MstUniversity } from '../entity/MstUniversityEntity';
import { IMstUniversityRepository } from './interface/IMstUniversityRepository';
import GetMstUniversityCondition from './vo/GetMstUniversityCondition';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class MstUniversityRepository extends Repository<MstUniversity> implements IMstUniversityRepository  {
  constructor(private dataSource: DataSource) {
    super(MstUniversity, dataSource.createEntityManager());
  }

  static readonly ALIAS = 'MstUniversity';
  static readonly COLNAMES = {
    COLUMN_UNIVERSITY_ID: 'university_id',
    COLUMN_UNIVERSITY_NAME: 'university_name',
    COLUMN_IS_RETURN_PLACE: 'is_return_place',
  };

  async countMstUniversity(searchParam: GetMstUniversityCondition): Promise<number> {
    const query = this.createQueryBuilder(MstUniversityRepository.ALIAS);
    this.setWhere(query, searchParam);
    return await query.getCount();
  }

  async fetchMstUniversity(searchParam: GetMstUniversityCondition): Promise<MstUniversity[]> {
    const query = this.createQueryBuilder(MstUniversityRepository.ALIAS);
    this.setWhere(query, searchParam);
    
    query.orderBy(
      `${MstUniversityRepository.ALIAS}.${MstUniversityRepository.COLNAMES.COLUMN_UNIVERSITY_ID}`,
      'ASC',
    );

    return await query.getMany();
  }

    // where句を共通化するメソッド
    private setWhere(query: SelectQueryBuilder<MstUniversity>, searchParam: GetMstUniversityCondition): SelectQueryBuilder<MstUniversity> {
      if (searchParam.universityId) {
        query.andWhere(
          `${MstUniversityRepository.ALIAS}.${MstUniversityRepository.COLNAMES.COLUMN_UNIVERSITY_ID} = :university_id`,
          { university_id: searchParam.universityId },
        );
      }
  
      if (searchParam.universityName) {
        query.andWhere(
          `${MstUniversityRepository.ALIAS}.${MstUniversityRepository.COLNAMES.COLUMN_UNIVERSITY_NAME} = :university_name`,
          { university_name: searchParam.universityName },
        );
      }
  
      if (searchParam.isReturnPlace) {
        query.andWhere(
          `${MstUniversityRepository.ALIAS}.${MstUniversityRepository.COLNAMES.COLUMN_IS_RETURN_PLACE} = :is_return_place`,
          { is_return_place: searchParam.isReturnPlace },
        );
      }
      return query;
    }
}
