import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Post } from './src/posts/entities/post.entity';
import { CreateUserSchema1715533618528 } from './migrations/1715533618528-create_user_schema';
import { AddedUserRole1715535940615 } from './migrations/1715535940615-added_user_role';
import { AadedWeight1715711784982 } from './migrations/1715711784982-aaded_weight';
import { ConfigEnum } from './src/common/enums/config.enum';

const configService = new ConfigService();

const options: DataSourceOptions = {
  type: 'postgres',
  host: configService.get(ConfigEnum.POSTGRES_HOST),
  port: parseInt(configService.get(ConfigEnum.POSTGRES_PORT)),
  username: configService.get(ConfigEnum.POSTGRES_USER),
  database: configService.get(ConfigEnum.POSTGRES_DB),
  password: configService.get(ConfigEnum.POSTGRES_PASSWORD),
  entities: [User, Post],
  migrations: [
    CreateUserSchema1715533618528,
    AddedUserRole1715535940615,
    AadedWeight1715711784982,
  ],
};

export default new DataSource(options);
