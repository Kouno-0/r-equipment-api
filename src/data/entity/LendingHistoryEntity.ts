/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Equipment } from './EquipmentEntity';
import { Users } from './UsersEntity';
import { MstUniversity } from './MstUniversityEntity';

@Entity('lending_history')
export class LendingHistory extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    { 
    length: 7,
    comment: '貸出履歴ID'
  })
  readonly lending_id: string;

  @Column(
    'date',
    {comment: '貸出日'}
  )
  readonly lending_date: Date;

  @Column(
    'date',
    {comment: '使用期間(From)'}
  )
  readonly use_from: Date;

  @Column(
    'date',
    {comment: '使用期間(To)'}
  )
  readonly use_to: Date;

  @Column(
    'date', 
    { 
      nullable: true,
      comment: '返却日'
     })
  readonly return_date: Date;

  @Column(
    'varchar',
    { 
    length: 4,
     nullable: true,
    comment: '返却場所ID'
  })
  readonly return_place_id: string;

  @Column(
    'varchar',
    { 
    length: 30,
     nullable: true,
    comment: '返却場所(その他)'
  })
  readonly return_place_other: string;

  @Column(
    'varchar',
    { 
    length: 10,
    comment: '装備ID'
  })
  readonly equipment_id: string;

  @Column(
    'varchar',
    { 
    length: 9,
    comment: '会員ID'
  })
  readonly user_id: string;

  @Column(
    'varchar',
    { 
    length: 30,
    comment: '行き先'
  })
  readonly destination: string;

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

  @ManyToOne(() => Equipment)
  @JoinColumn(
    { name: 'equipment_id' })
  readonly equipment: Equipment;

  @ManyToOne(() => Users)
  @JoinColumn(
    { name: 'user_id' })
  readonly user: Users;

  @ManyToOne(() => MstUniversity)
  @JoinColumn(
    { name: 'return_place_id' })
  readonly returnPlace: MstUniversity;
}
