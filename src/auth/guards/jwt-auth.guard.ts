import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategiesEnum } from 'src/common/enums/auth-strategies.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategiesEnum.JWT) {}
