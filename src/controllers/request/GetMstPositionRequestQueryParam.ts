/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from "class-validator";
import { COLUMNS } from "src/common/const/column";

class GetMstPositionRequestQueryParam {

  @ApiProperty({ required: false, description: '役職ID' })
  @Type(() => String)
  @IsOptional()
  @IsNumberString()
  @MaxLength(4, { message: () => `${COLUMNS.positionId}は$constraint1桁以内で入力してください` })
  positionId?: string;

  @ApiProperty({ required: false, description: '役職名' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(30, { message: () => `${COLUMNS.positionName}は$constraint1桁以内で入力してください` })
  positionName?: string;

  @ApiProperty({ required: false, description: '管理者フラグ' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: () =>`${COLUMNS.isManager}は0か1のみを入力してください` }) 
  isManager?: number;
}

Object.seal(GetMstPositionRequestQueryParam);
export default GetMstPositionRequestQueryParam;