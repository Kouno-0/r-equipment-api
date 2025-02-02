/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Equipment } from './EquipmentEntity';
import { Users } from './UsersEntity';
import { MstUniversity } from './MstUniversityEntity';

@Entity('lending_histories')
export class LendingHistories extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    { 
    length: 7,
    comment: '貸出履歴ID'
  })
  readonly lending_id: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '装備ID'
  })
  readonly equipment_id: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '持出会員ID'
  })
  readonly lend_user_id: string;

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
    'varchar',
    { 
    length: 30,
    comment: '行き先'
  })
  readonly destination: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '返却会員ID'
  })
  readonly return_user_id: string;

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
    length: 3,
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
  @JoinColumn({ name: 'lend_user_id' })
  readonly user: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'return_user_id' })
  readonly returnUser: Users;

  @ManyToOne(() => MstUniversity)
  @JoinColumn(
    { name: 'return_place_id' })
  readonly returnPlace: MstUniversity;
}
