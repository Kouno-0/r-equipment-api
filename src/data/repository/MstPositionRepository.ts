/* eslint-disable prettier/prettier */
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MstPosition } from '../entity/MstPositionEntity';
import { IMstPositionRepository } from './interface/IMstPositionRepository';
import GetMstPositionCondition from './vo/GetMstPositionCondition';

@Injectable()
export class MstPositionRepository extends Repository<MstPosition> implements IMstPositionRepository {
  constructor(private dataSource: DataSource) {
    super(MstPosition, dataSource.createEntityManager());
  }

  static readonly ALIAS = 'MstPosition';
  static readonly COLNAMES = {
    COLUMN_POSITION_ID: 'position_id',
    COLUMN_POSITION_NAME: 'position_name',
    COLUMN_IS_MANAGER: 'is_manager',
  };

  async countMstPosition(searchParam: GetMstPositionCondition): Promise<number> {
    const query = this.createQueryBuilder(MstPositionRepository.ALIAS);
    this.setWhere(query, searchParam);
    return await query.getCount();
  }

  async fetchMstPosition(searchParam: GetMstPositionCondition): Promise<MstPosition[]> {
    const query = this.createQueryBuilder(MstPositionRepository.ALIAS);
    this.setWhere(query, searchParam);
    
    query.orderBy(
      `${MstPositionRepository.ALIAS}.${MstPositionRepository.COLNAMES.COLUMN_POSITION_ID}`,
      'ASC',
    );

    return await query.getMany();
  }

    // where句を共通化するメソッド
    private setWhere(query: SelectQueryBuilder<MstPosition>, searchParam: GetMstPositionCondition): SelectQueryBuilder<MstPosition> {
      if (searchParam.positionId) {
        query.andWhere(
          `${MstPositionRepository.ALIAS}.${MstPositionRepository.COLNAMES.COLUMN_POSITION_ID} = :position_id`,
          { position_id: searchParam.positionId },
        );
      }
  
      if (searchParam.positionName) {
        query.andWhere(
          `${MstPositionRepository.ALIAS}.${MstPositionRepository.COLNAMES.COLUMN_POSITION_NAME} = :position_name`,
          { position_name: searchParam.positionName },
        );
      }
  
      if (searchParam.isManager) {
        query.andWhere(
          `${MstPositionRepository.ALIAS}.${MstPositionRepository.COLNAMES.COLUMN_IS_MANAGER} = :is_manager`,
          { is_manager: searchParam.isManager },
        );
      }
      return query;
    }

}

