/* eslint-disable prettier/prettier */
import { MstType } from '../entity/MstTypeEntity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MstTypeRepository extends Repository<MstType>{
  constructor(private dataSource: DataSource) {
    super(MstType, dataSource.createEntityManager());
  }

  // エイリアスとカラム名の静的プロパティ
  static readonly ALIAS = 'MstType';
  static readonly COLNAMES = {
    COLUMN_TYPE_KBN: 'type_kbn',
    COLUMN_TYPE_CD: 'type_cd',
    COLUMN_TYPE_NAME: 'type_name',
    COLUMN_SORT_ORDER: 'sort_order',
    COLUMN_CREATE_DATE: 'create_date',
    COLUMN_UPDATE_DATE: 'update_date',
  };

}
