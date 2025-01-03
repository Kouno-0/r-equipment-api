/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, BaseEntity, OneToMany } from 'typeorm';
import { Users } from './UsersEntity';

@Entity('mst_position')
@Unique(['position_name'])
export class MstPosition extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    { 
    length: 3,
    comment: '役職ID'
  })
  readonly position_id: string;

  @OneToMany(() => Users, (user) => user.position )
  users: Users[];

  @Column(
    'varchar',
    {
    length: 30,
    comment: '役職名'
  })
  readonly position_name: string;

  @Column(
    'int',
    { nullable: true,
      comment: '管理者フラグ'
    }
  )
  readonly is_manager: number;

  @CreateDateColumn({
    comment: '登録日時'
  })
  readonly create_date: Date;

  @UpdateDateColumn({
    comment: '更新日時'
  })
  readonly update_date: Date;

}
