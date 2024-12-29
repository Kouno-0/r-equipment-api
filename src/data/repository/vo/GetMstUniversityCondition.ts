/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetMstUniversityCondition{
  readonly universityId? : string;
  readonly universityName? : string;
  readonly isReturnPlace? : number;
}
Object.seal(GetMstUniversityCondition);
export default GetMstUniversityCondition