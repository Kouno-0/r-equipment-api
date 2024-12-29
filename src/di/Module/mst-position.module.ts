/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MstPositionController } from 'src/controllers/MstPositionController';
import { MstPosition } from 'src/data/entity/MstPositionEntity';  // MstPositionエンティティをインポート
import { MstPositionRepository } from 'src/data/repository/MstPositionRepository';
import { MstPositionService } from 'src/services/MstPositionService';

@Module({
  imports: [
    TypeOrmModule.forFeature([MstPosition]),
  ],
  controllers: [MstPositionController],
  providers: [MstPositionService, MstPositionRepository],
  exports: [MstPositionRepository],
})
export class MstPositionModule {}
