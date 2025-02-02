/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import dataSource from 'src/data/typeOrm.config';
import { MstEquipmentModule } from './mst-equipment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MstUniversityModule } from './mst-university.module';
import { MstPositionModule } from './mst-position.module';
import { UsersModule } from './users.module';
import { EquipmentModule } from './equipment.module';
import { LendingHistoriesModule } from './lending-histories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
    }),
    MstEquipmentModule,
    MstUniversityModule,
    MstPositionModule,
    EquipmentModule,
    UsersModule,
    LendingHistoriesModule
  ],
})
export class AppModule {}
