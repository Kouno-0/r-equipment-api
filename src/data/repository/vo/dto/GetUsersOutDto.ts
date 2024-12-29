export class UserDto {
  userId: number;
  term: string;
  userLastName: string;
  userFirstName: string;
  userLastNameKana: string;
  userFirstNameKana: string;
  fullNameKana: string;
  universityId: number;
  universityName: string;
  universityOther: string;
  positionId: number;
  positionName: string;
  isManager: boolean;
  mailAddress: string;
  createDate: Date;
  updateDate: Date;
}
