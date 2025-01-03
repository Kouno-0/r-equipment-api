/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UsersService } from 'src/services/UsersService';
import { GetUsersRequestQueryParam } from './request/GetUsersRequestQueryParam';
import { GetUsersResponse } from './response/GetUsersResponse';
import GetUsersInVo from 'src/services/vo/GetUsersInVo';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Get()
  @ApiResponse({ status: 200, type: GetUsersResponse })
    async getUsers(@Query() query: GetUsersRequestQueryParam ): Promise<GetUsersResponse> {
      const inVo = plainToClass(GetUsersInVo, query);
      const getUsersResult: GetUsersResponse = await this.service.getUsers(inVo);
        return getUsersResult;
  }
}

