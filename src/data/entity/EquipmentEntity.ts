/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { MstEquipment } from './MstEquipmentEntity';

@Entity('equipment')
export class Equipment extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    {
    length: 10,
    comment: '装備ID'
  })
  readonly equipment_id: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '装備カテゴリID' 
   })
  readonly category_id: string;

  @Column(
    'varchar',
    { 
    length: 100,
    comment: '装備名'
   })
  readonly equipment_name: string;

  @Column(
    'date',
    {comment: '購入日'}
  )
  readonly purchase_date: Date;

  @Column(
    'int', 
    { 
      nullable: true,
      comment: '使用不可フラグ'
   }
  )
  readonly is_unavailable: number;

  @Column(
    'varchar',
    { 
    length: 300, 
    nullable: true,
    comment: '概要'
   })
  readonly summary: string;

  @CreateDateColumn(
    {
    comment: '登録日時'
 })
  readonly create_date: Date;

  @UpdateDateColumn(
    {
    comment: '更新日時'
  })
  readonly update_date: Date;

  @ManyToOne(() => MstEquipment)
  @JoinColumn({ name: 'category_id' })
  readonly category: MstEquipment;
}
