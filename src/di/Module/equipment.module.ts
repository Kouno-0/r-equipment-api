/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from 'src/data/entity/EquipmentEntity';
import { EquipmentService } from 'src/services/EquipmentService';
import { EquipmentRepository } from 'src/data/repository/EquipmentRepository';
import { EquipmentController } from 'src/controllers/EquipmentController';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment]),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository],
  exports:  [EquipmentService, EquipmentRepository],
})
export class EquipmentModule {}
