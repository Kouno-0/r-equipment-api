/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('notification')
export class Notification extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    { 
    length: 7,
    comment: 'お知らせID'
  })
  readonly notification_id: string;

  @Column(
    'date',
    {comment: '通知期間(From)'}
  )
  readonly notification_date_from: Date;

  @Column(
    'date',
    {comment: '通知期間(To)'}
  )
  readonly notification_date_to: Date;

  @Column(
    'varchar',
    { 
    length: 30,
    comment: 'タイトル'
  })
  readonly title: string;

  @Column(
    'varchar',
    { 
    length: 400,
    nullable: true,
    comment: '本文'
  })
  readonly contents: string;

  @CreateDateColumn({
    comment: '登録日時'
  })
  readonly create_date: Date;

  @UpdateDateColumn({
    comment: '更新日時'
  })
  readonly update_date: Date;
}
