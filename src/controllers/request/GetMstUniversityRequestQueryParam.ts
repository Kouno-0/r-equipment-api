/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Equals, IsOptional, IsString, MaxLength } from "class-validator";
import { COLUMNS } from "src/common/const/column";

class GetMstUniversityRequestQueryParam {

  @ApiProperty({ required: false, description: '大学ID' })
  @Type(() => String)
  @IsOptional()
  @MaxLength(4, { message: () => `${COLUMNS.universityId}は$constraint1桁以内で入力してください` })
  universityId?: string;

  @ApiProperty({ required: false, description: '大学名' })
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(30, { message: `${COLUMNS.universityName}は$constraint1桁以内で入力してください` })
  universityName?: string;

  @ApiProperty({ required: false, description: '装備カテゴリ名2' })
  @Type(() => String)
  @IsOptional()
  @Equals(1, {message: `${COLUMNS.isReturnPlace}は1またはNULLのみ有効です` })
  isReturnPlace?: number;
}
Object.seal(GetMstUniversityRequestQueryParam);
export default GetMstUniversityRequestQueryParam;