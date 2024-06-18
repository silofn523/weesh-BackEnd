/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ChatsModule } from './chats/chats.module'
import { ConfigurationModule } from './configuration/configuration.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { AdminCommentModule } from './admin-comment/admin-comment.module'
import { EventModule } from './event/event.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('DB_HOST'),
        port: ConfigService.get('DB_PORT'),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_SCHEMA'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: ConfigService.get<boolean>('TYPEORM_SYBCHRONIZE')
      })
    }),
    UsersModule,
    ChatsModule,
    ConfigurationModule,
    AuthModule,
    CommentModule,
    AdminCommentModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthModule]
})
export class AppModule {}
