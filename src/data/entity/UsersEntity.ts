/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { MstUniversity } from './MstUniversityEntity';
import { MstPosition } from './MstPositionEntity';

@Entity('users')
export class Users extends BaseEntity  {
  @PrimaryColumn(
    'varchar',
    { 
    length: 9,
    comment: '会員ID'
  })
  readonly user_id: string;

  @Column(
    'smallint',
    {comment: '期'}
  )
  readonly term: number;

  @Column(
    'varchar',
    { 
    length: 30,
    comment: '会員姓'
  })
  readonly user_last_name: string;

  @Column(
    'varchar',
    { 
    length: 30,
    comment: '会員名'
  })
  readonly user_first_name: string;

  @Column(
    'varchar',
    { 
    length: 50,
    comment: '会員姓カナ'
  })
  readonly user_last_name_kana: string;

  @Column(
    'varchar',
    { 
    length: 50,
    comment: '会員名カナ'
  })
  readonly user_first_name_kana: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '大学ID'
  })
  readonly university_id: string;

  @ManyToOne(() => MstUniversity, (university) => university.users)
  @JoinColumn({ name: 'university_id' }) 
  university: MstUniversity

  @Column(
    'varchar',
    { 
    length: 100,
     nullable: true,
     comment: '所属その他'
     })
  readonly university_other: string;

  @Column(
    'varchar',
    { 
    length: 4,
    nullable: true,
    comment: '役職ID'
   })
  readonly position_id: string;

  @ManyToOne(() => MstPosition, (MstPosition) => MstPosition.users)
  @JoinColumn({ name: 'position_id' })
  readonly position: MstPosition;

  @Column(
    'varchar',
    { 
    length: 256,
    comment: 'メールアドレス'
  })
  readonly mail_address: string;

  @CreateDateColumn({
    comment: '登録日時'
  })
  readonly create_date: Date;

  @UpdateDateColumn({
    comment: '更新日時'
  })
  readonly update_date: Date;

;
}
