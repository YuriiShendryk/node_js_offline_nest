import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserSearchField, UserSearchOptions } from '../types/user-search.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private where = new Map<UserSearchField, (value: string | number) => object>([
    ['id', (id) => ({ id })],
    ['email', (email) => ({ email })],
  ]);

  async create({ email, firstName, lastName, password }: CreateUserDto) {
    const user = new User();
    Object.assign<User, CreateUserDto>(user, {
      firstName,
      lastName,
      email,
      password,
    });
    await this.userRepository.save(user);
  }

  async getUser({ column, value, withRelations = true }: UserSearchOptions) {
    const buildWhere = this.where.get(column);
    const where = buildWhere(value);

    const user = await this.userRepository.findOne({
      where,
      ...(withRelations && {
        relations: ['posts'],
      }),
    });

    return user;
  }
}
