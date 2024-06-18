/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Chat } from './entities/chat.entity'
import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'

// 익명 채팅
@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chat: Repository<Chat>,
    private readonly userService: UsersService
  ) {}

  public async createChat(dto: CreateChatDto): Promise<Chat> {
    for (let i = 0; i < dto.userId.length; i++) {
      await this.userService.getOneUser(dto.userId[i])
    }
    const chat = await this.chat.save({
      users: dto.userId.map((id) => ({ id }))
    })

    return this.chat.findOne({
      where: {
        id: chat.id
      }
    })
  }

  public async checkIfChatExists(chatId: number): Promise<boolean> {
    const exists = await this.chat.exists({
      where: {
        id: chatId
      }
    })

    return exists
  }

  public findAllChat(): Promise<Chat[]> {
    return this.chat.find()
  }

  public async findOneChat(id: number): Promise<Chat> {
    return await this.chat.findOneBy({ id })
  }

  public async deleteChat(id: number): Promise<void> {
    const resuit = await this.chat.delete({ id })

    if (resuit.affected === 0) {
      throw new NotFoundException({
        success: false,
        message: `Can't find Chat with ID : ${id}`
      })
    }
  }
}
