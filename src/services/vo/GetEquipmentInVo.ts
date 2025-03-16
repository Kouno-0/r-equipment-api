/* eslint-disable prettier/prettier */
export default class GetEquipmentInVo {
  readonly count: number;
  readonly pageNumber: number;
  readonly equipmentId?: string;
  readonly equipmentCategoryId?: string;
  readonly equipmentName?: string;
  readonly purchaseDateFrom?: string;
  readonly purchaseDateTo?: string;
  readonly equipmentStateCd?: string;
  readonly storePlaceCd?: string;
  readonly sort?: string;
  readonly direction: "ASC" | "DESC";

}