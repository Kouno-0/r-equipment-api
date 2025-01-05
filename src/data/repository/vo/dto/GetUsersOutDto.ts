/* eslint-disable prettier/prettier */
export class UserDto {
  userId: string;
  term: number;
  userLastName: string;
  userFirstName: string;
  userLastNameKana: string;
  userFirstNameKana: string;
  fullNameKana: string;
  universityId: string;
  universityName: string;
  universityOther: string;
  positionId: string;
  positionName: string;
  isManager: boolean;
  mailAddress: string;
  createDate: Date;
  updateDate: Date;
}
