/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, BaseEntity, OneToMany } from 'typeorm';
import { Equipment } from './EquipmentEntity';


@Entity('mst_type')
@Unique(['type_kbn', 'type_cd'])
export class MstType extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    { 
    length: 50,
    comment: '区分タイプ'
  })
  readonly type_kbn: string;


  @Column(
    'varchar',
    {
    length: 2,
    comment: '区分コード'
  })
  readonly type_cd: string;

  @OneToMany(() => Equipment, (equipment) => equipment.mstType) 
  equipment: Equipment[];


  @Column(
    'varchar',
    {
    length: 50,
    comment: '区分名'
  })
  readonly type_name: string;

  @Column(
    'int',
    {
    comment: '表示順序'
  })
  readonly sort_order: number;

  @CreateDateColumn({
    comment: '登録日時'
  })
  readonly create_date: Date;

  @UpdateDateColumn({
    comment: '更新日時'
  })
  readonly update_date: Date;

}
