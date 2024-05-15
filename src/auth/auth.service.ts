import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LibsEnum } from 'src/common/enums/libs.enum';
import { bcrypt } from 'src/utils/libs/bcrypt/bcrypt.types';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { MailingService } from 'src/mailing/services/mailing.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(LibsEnum.BCRYPT) private readonly bcryptLib: bcrypt,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailingService: MailingService,
  ) {}

  private readonly HASH_ROUNDS = 10;

  async register({ email, firstName, lastName, password }: RegisterDto) {
    console.log({ email });
    const existedUser = await this.userService.getUser({
      column: 'email',
      value: email,
      withRelations: false,
    });

    if (existedUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.bcryptLib.hash(
      password,
      this.HASH_ROUNDS,
    );

    await this.userService.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await this.mailingService.sendConfirmRegistration({ email });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.checkLoginCredentials({ email, password });
    const token = await this.generateToken(user);
    return {
      email: user.email,
      id: user.id,
      token,
    };
  }

  async generateToken({ id, role }: JwtPayload, signOptions?: JwtSignOptions) {
    const token = await this.jwtService.signAsync(
      {
        id,
        role,
      },
      signOptions,
    );
    return token;
  }

  async checkLoginCredentials({ email, password }: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    const isPasswordEqual = await this.verifyPassword(password, user.password);
    if (!user || !isPasswordEqual) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

  private async verifyPassword(newPassword: string, currentPassword: string) {
    const isPassEqual = await this.bcryptLib.compare(
      newPassword,
      currentPassword,
    );
    return isPassEqual;
  }
}
