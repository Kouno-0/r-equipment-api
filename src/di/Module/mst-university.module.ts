/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MstUniversityController } from 'src/controllers/MstUniversityController';
import { MstUniversity } from 'src/data/entity/MstUniversityEntity';
import { MstUniversityRepository } from 'src/data/repository/MstUniversityRepository';
import { MstUniversityService } from 'src/services/MstUniversityService';


@Module({
  imports: [
    TypeOrmModule.forFeature([MstUniversity]),
  ],
  controllers: [MstUniversityController],
  providers: [MstUniversityService, MstUniversityRepository],
  exports: [MstUniversityService, MstUniversityRepository],
})
export class MstUniversityModule {}
