/* eslint-disable prettier/prettier */
export default class GetLendingHistoriesInVo{
  readonly count: number;
  readonly pageNumber: number;
  readonly lendingId? : string;
  readonly equipmentId? : string;
  readonly equipmentCategoryId? : string;
  readonly lendFrom? : string;
  readonly lendTo? : string;
  readonly useFrom? : string;
  readonly useTo? : string;
  readonly lendUserId? : string;
  readonly lendUserNameKana? : string;
  readonly returnUserId? : string;
  readonly returnUserNameKana? : string;
  readonly statusCd?  : '00' | '01';
  readonly returnPlaceId?: string;
  readonly sort : string;
  readonly direction: "ASC" | "DESC";
}