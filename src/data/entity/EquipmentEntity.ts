/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity, OneToMany } from 'typeorm';
import { MstEquipment } from './MstEquipmentEntity';
import { MstType } from './MstTypeEntity';
import { LendingHistories } from './LendingHistoriesEntity';

@Entity('equipment')
export class Equipment extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    {
      length: 7,
      comment: '装備ID'
    })
  readonly equipment_id: string;

  @Column(
    'varchar',
    {
      length: 5,
      comment: '装備カテゴリID'
    })
  readonly category_id: string;

  @ManyToOne(() => MstEquipment, (equipment) => equipment.equipment)
  @JoinColumn({ name: 'category_id' })
  mstEquipment: MstEquipment

  @Column(
    'varchar',
    {
      length: 100,
      comment: '装備名'
    })
  readonly equipment_name: string;

  @Column('date', {
    comment: '購入日',
  })
  readonly purchase_date: string;

  @Column(
    'varchar',
    {
      length: 2,
      nullable: true,
      comment: '装備状態'
    }
  )
  readonly equipment_state_cd: string;

  @Column(
    'varchar',
    {
      length: 2,
      nullable: true,
      comment: '保管場所'
    }
  )
  readonly store_place_cd: string;

  @Column(
    'varchar',
    {
      length: 300,
      nullable: true,
      comment: '概要'
    })
  readonly summary: string;

  @Column(
    'varchar',
    {
      length: 300,
      nullable: true,
      comment: '備考'
    })
  readonly remark: string;

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

  // Join
  @ManyToOne(() => MstType, (mstType) => mstType.equipmentState)
  @JoinColumn({ name: 'equipment_state_cd', referencedColumnName: 'type_cd' })
  mstEquipmentState: MstType

  @ManyToOne(() => MstType, (mstType) => mstType.storePlace)
  @JoinColumn({ name: 'store_place_cd', referencedColumnName: 'type_cd' })
  mstStorePlace: MstType

  @ManyToOne(() => MstEquipment)
  @JoinColumn({ name: 'category_id' })
  readonly category: MstEquipment;

  @OneToMany(() => LendingHistories, (lendingHistories) => lendingHistories.equipment_id)
  lendingHistories: LendingHistories[];
}
