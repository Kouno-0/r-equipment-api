/* eslint-disable prettier/prettier */
export default class GetLendingHistoriesInVo{
  readonly count: number;
  readonly pageNumber: number;
  readonly lendingId?: string;
  readonly equipmentId?: string;
  readonly equipmentCategoryId?: string;
  readonly lendFrom?: string;
  readonly lendTo?: string;
  readonly useFrom?: string;
  readonly useTo?: string;
  readonly userId?: string;
  readonly userNameKana?: string;
  readonly isReturn?: string;
  readonly returnPlaceId?: string;
  readonly sort? : string;
  readonly direction: "ASC" | "DESC";

}