/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetMstPositionCondition{
  readonly positionId? : string;
  readonly positionName? : string;
  readonly isManager? : string;
}
Object.seal(GetMstPositionCondition);
export default GetMstPositionCondition