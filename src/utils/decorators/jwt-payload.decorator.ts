import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

export const GetJwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return user;
  },
);
