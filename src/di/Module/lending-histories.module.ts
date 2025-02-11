/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LendingHistoriesController } from '../../controllers/LendingHistoriesController';
import { LendingHistoriesService } from 'src/services/LendingHistoriesService';
import { LendingHistoriesRepository } from 'src/data/repository/LendingHistoriesRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LendingHistories } from 'src/data/entity/LendingHistoriesEntity';
import { MstEquipmentService } from 'src/services/MstEquipmentService';
import { MstUniversityService } from 'src/services/MstUniversityService';
import { UsersModule } from './users.module';
import { UsersService } from 'src/services/UsersService';
import { EquipmentModule } from './equipment.module';
import { EquipmentService } from 'src/services/EquipmentService';
import { MstEquipmentModule } from './mst-equipment.module';
import { MstUniversityModule } from './mst-university.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LendingHistories]),
    MstEquipmentModule,
    MstUniversityModule,
    UsersModule,
    EquipmentModule,
  ],
  controllers: [LendingHistoriesController],
  providers: [LendingHistoriesService, LendingHistoriesRepository, MstEquipmentService, MstUniversityService, UsersService, EquipmentService],
  exports: [LendingHistoriesService, LendingHistoriesRepository, TypeOrmModule],
})
export class LendingHistoriesModule {}
