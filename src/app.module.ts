import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailingModule } from './mailing/mailing.module';
import { AuthControllerNest } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PostsModule,
    AuthModule,
    UsersModule,
    MailingModule,
  ],
  controllers: [AppController, AuthControllerNest],
  providers: [AppService],
})
export class AppModule {}
