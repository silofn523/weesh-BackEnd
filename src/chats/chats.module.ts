/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { ChatsService } from './chats.service'
import { ChatsGateway } from './chats.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chat } from './entities/chat.entity'
import { ChatsController } from './chats.controller'
import { Messages } from './messages/entities/messages.entity'
import { MessagesService } from './messages/messages.service'
import { MessagesController } from './messages/messages.controller'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'
import { User } from 'src/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Messages, User]), UsersModule],
  providers: [ChatsGateway, ChatsService, MessagesService, UsersService],
  controllers: [ChatsController, MessagesController]
})
export class ChatsModule {}
