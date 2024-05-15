import { UserRoleEnum } from 'src/users/enums/user-role.enum';

export class JwtPayloadDto {
  id: number;
  role: UserRoleEnum;
}
