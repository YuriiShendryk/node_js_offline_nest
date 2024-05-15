import { Module } from '@nestjs/common';

import { PostsController } from './controllers/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsService } from './services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [TypeOrmModule],
})
export class PostsModule {}
