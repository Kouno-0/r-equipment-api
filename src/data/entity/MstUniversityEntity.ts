/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, BaseEntity, OneToMany } from 'typeorm';
import { Users } from './UsersEntity';

@Entity('mst_university')
@Unique(['university_name'])
export class MstUniversity extends BaseEntity {
  @PrimaryColumn(
    'varchar',
    { 
    length: 4,
    comment: '大学ID'
  })
  readonly university_id: string;

  @OneToMany(() => Users, (user) => user.university) 
  users: Users[];

  @Column(
    'varchar',
    { 
    length: 30,
    comment: '大学名'
  })
  readonly university_name: string;

  @Column(
    'int', 
    { 
      nullable: true,
      comment: '返却場所フラグ'
     }
  )
  readonly is_return_place: number;

  @Column(
    'varchar',
    { 
    length: 100, 
    nullable: true,
    comment: '備考'
   })
  readonly remarks: string;

  @CreateDateColumn({
    comment: '登録日時'
  })
  readonly create_date: Date;

  @UpdateDateColumn({
    comment: '更新日時'
  })
  readonly update_date: Date;


}
