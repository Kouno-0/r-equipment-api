/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
@Expose()
class GetUsersCondition{
  readonly count: number;
  readonly pageNumber: number;
  readonly userId: string;
  readonly term: string;
  readonly userNameKana: string;
  readonly universityId: string;
  readonly positionId: string;
  readonly mailAddress: string;
  readonly sort: string;
  readonly direction: "ASC" | "DESC";
}
Object.seal(GetUsersCondition);
export default GetUsersCondition