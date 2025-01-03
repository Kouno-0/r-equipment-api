/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { PARAMS } from "src/common/const/params";

class GetMstUniversityRequestQueryParam {

  @ApiProperty({ required: false, description: '大学ID' })
  @Type(() => String)
  @IsOptional()
  @MaxLength(3, { message: () => `${PARAMS.universityId}は$constraint1桁以内で入力してください` })
  universityId?: string;

  @ApiProperty({ required: false, description: '大学名' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(30, { message: `${PARAMS.universityName}は$constraint1桁以内で入力してください` })
  universityName?: string;

}
Object.seal(GetMstUniversityRequestQueryParam);
export default GetMstUniversityRequestQueryParam;