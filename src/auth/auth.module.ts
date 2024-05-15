import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { BcryptModule } from 'src/utils/libs/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/common/enums/config.enum';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [
    UsersModule,
    BcryptModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(ConfigEnum.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(ConfigEnum.JWT_EXPIRATION_TIME) + 'h',
        },
      }),
    }),
    MailingModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
