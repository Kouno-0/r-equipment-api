/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import GetUsersInVo from './vo/GetUsersInVo';
import GetUsersOutVo from './vo/GetUsersOutVo';
import { UsersRepository } from 'src/data/repository/UsersRepository';
import GetUsersCondition from 'src/data/repository/vo/GetMstUsersCondition';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) { }
    async getUsers(inVo: GetUsersInVo): Promise<{total: number, results: GetUsersOutVo[]}>{
      try{
        const searchParam = plainToClass(GetUsersCondition, inVo)
        const total = await this.repository.countUsers(searchParam);
        if(!total){
          return {total: 0, results: []};
        }

        // ページ数 > 指定したページ番号 であるかをチェック
        if(inVo.pageNumber && Number(inVo.pageNumber) > Math.ceil(total /Number(inVo.count)) ){
          console.log(Math.ceil(total /Number(inVo.count)));
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Bad Request',
              message: '指定されたページ番号が不正です。',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        const getUsersResult = await this.repository.fetchUsers(searchParam);
        return {
          total,
          results: plainToClass(GetUsersOutVo, getUsersResult)
        }
      }
      catch(e){
        throw e;
      }
    }
  }

