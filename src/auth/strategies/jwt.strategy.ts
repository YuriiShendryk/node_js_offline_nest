import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../types/jwt-payload.type';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ConfigEnum } from 'src/common/enums/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigEnum.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayloadDto> {
    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
