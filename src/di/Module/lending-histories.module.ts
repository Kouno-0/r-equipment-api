/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LendingHistoriesController } from '../../controllers/LendingHistoriesController';
import { LendingHistoriesService } from 'src/services/LendingHistoriesService';
import { LendingHistoriesRepository } from 'src/data/repository/LendingHistoriesRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LendingHistories } from 'src/data/entity/LendingHistoriesEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LendingHistories]),
  ],
  controllers: [LendingHistoriesController],
  providers: [LendingHistoriesService, LendingHistoriesRepository],
  exports: [LendingHistoriesRepository],
})
export class LendingHistoriesModule {}
