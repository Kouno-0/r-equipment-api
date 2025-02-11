/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MstEquipmentController } from 'src/controllers/MstEquipmentController';
import { MstEquipment } from 'src/data/entity/MstEquipmentEntity';
import { MstEquipmentRepository } from 'src/data/repository/MstEquipmentRepository';
import { MstEquipmentService } from 'src/services/MstEquipmentService';

@Module({
  imports: [
    TypeOrmModule.forFeature([MstEquipment]), 
  ],
  controllers: [MstEquipmentController],
  providers: [MstEquipmentService, MstEquipmentRepository],
  exports: [MstEquipmentService, MstEquipmentRepository],
})
export class MstEquipmentModule {}
