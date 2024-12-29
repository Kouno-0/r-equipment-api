/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from '../../controllers/UsersController';
import { UsersService } from 'src/services/UsersService';
import { UsersRepository } from 'src/data/repository/UsersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/data/entity/UsersEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
