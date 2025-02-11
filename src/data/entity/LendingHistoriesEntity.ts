/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity, BeforeInsert, Not } from 'typeorm';
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
  lending_id: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '装備ID'
  })
  equipment_id: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '持出会員ID'
  })
  lend_user_id: string;

  @Column(
    'date',
    {comment: '貸出日'}
  )
  lending_date: Date;

  @Column(
    'date',
    {comment: '使用期間(From)'}
  )
  use_from: Date;

  @Column(
    'date',
    {comment: '使用期間(To)'}
  )
  use_to: Date;

  @Column(
    'varchar',
    { 
    length: 30,
    comment: '行き先'
  })
  destination: string;

  @Column(
    'varchar',
    { 
    length: 7,
    comment: '返却会員ID'
  })
  return_user_id: string;

  @Column(
    'date', 
    { 
      nullable: true,
      comment: '返却日'
     })
  return_date: Date;

  @Column(
    'varchar',
    { 
    length: 3,
     nullable: true,
    comment: '返却場所ID'
  })
  return_place_id: string;

  @Column(
    'varchar',
    { 
    length: 30,
     nullable: true,
    comment: '返却場所(その他)'
  })
  return_place_other: string;

  @CreateDateColumn(
    {
    comment: '登録日時'
  })
  create_date: Date;

  @UpdateDateColumn(
    {
    comment: '更新日時'
  })
  update_date: Date;

  @ManyToOne(() => Equipment)
  @JoinColumn(
    { name: 'equipment_id' })
  equipment: Equipment;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'lend_user_id' })
  user: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'return_user_id' })
  returnUser: Users;

  @ManyToOne(() => MstUniversity)
  @JoinColumn(
    { name: 'return_place_id' })
  returnPlace: MstUniversity;

  // lending_id を自動採番
  @BeforeInsert()
  async generateLendingId() {
    const lastEntry = await LendingHistories.findOne({
      where: { lending_id: Not('') }, 
      order: { lending_id: 'DESC' },
    });

    let newIdNumber = 1;
    if (lastEntry) {
      const lastIdNumber = parseInt(lastEntry.lending_id.slice(1), 10);
      newIdNumber = lastIdNumber + 1;
    }

    this.lending_id = `H${newIdNumber.toString().padStart(6, '0')}`;

  }
}
