/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LendingHistoriesController } from '../../controllers/LendingHistoriesController';
import { LendingHistoriesService } from 'src/services/LendingHistoriesService';
import { LendingHistoriesRepository } from 'src/data/repository/LendingHistoriesRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LendingHistories } from 'src/data/entity/LendingHistoriesEntity';
import { MstEquipmentRepository } from 'src/data/repository/MstEquipmentRepository';
import { MstEquipmentService } from 'src/services/MstEquipmentService';
import { MstUniversityRepository } from 'src/data/repository/MstUniversityRepository';
import { MstUniversityService } from 'src/services/MstUniversityService';

@Module({
  imports: [
    TypeOrmModule.forFeature([LendingHistories]),
  ],
  controllers: [LendingHistoriesController],
  providers: [LendingHistoriesService, LendingHistoriesRepository, MstEquipmentService, MstEquipmentRepository, MstUniversityService, MstUniversityRepository,  ],
  exports: [LendingHistoriesRepository],
})
export class LendingHistoriesModule {}
