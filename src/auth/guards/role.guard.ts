import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import { AuthRequest } from '../types/auth-request.type';

const DEFAULT_FORBIDDEN_MESSAGE = 'Forbidden resource';
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<AuthRequest>();
    if (user.role === UserRoleEnum.ADMIN) return true;
    throw new ForbiddenException(DEFAULT_FORBIDDEN_MESSAGE);
  }
}
