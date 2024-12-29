/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('mst_equipment')
export class MstEquipment extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    {
    length: 7,
    name: 'equipment_category_id',
    comment: '装備カテゴリID'
   })
  readonly equipmentCategoryId: string;

  @Column(
    'varchar',
    { 
    length: 30,
    name: 'equipment_category_name1',
    comment: '装備カテゴリ名1'
   })
  readonly equipmentCategoryName1: string;

  @Column(
    'varchar',
    { 
    length: 30,
    name: 'equipment_category_name2',
    nullable: true,
    comment: '装備カテゴリ名2' })
  readonly equipmentCategoryName2: string;

  @CreateDateColumn({
    name: 'create_date',
    comment: '登録日時'
  })
  readonly createDate: Date;

  @UpdateDateColumn({
    name: 'update_date',
    comment: '更新日時'
  })
  readonly updateDate: Date;
}
