/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { ChatsService } from './chats.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Guard } from 'src/auth/guard/auth.guard'

@ApiTags('Chats(채팅방)')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: '채팅방 생성', description: '채팅방을 생성합니다' })
  @UseGuards(Guard)
  @ApiBody({ type: CreateChatDto })
  @Post()
  public async createChat(@Body(ValidationPipe) data: CreateChatDto): Promise<Chat> {
    return await this.chatsService.createChat(data)
  }

  @ApiOperation({ summary: '전체 채팅방 목록 조회 ', description: '모든 채팅방을 조회합니다' })
  @UseGuards(Guard)
  @Get()
  public findAllChat(): Promise<Chat[]> {
    return this.chatsService.findAllChat()
  }

  @ApiOperation({ summary: '채팅방 ID별로 조회 ', description: '채팅방을 조회합니다' })
  @UseGuards(Guard)
  @Get(':id')
  public async findOneChat(@Param('id') id: number): Promise<{ success: boolean; body: Chat }> {
    const chat = await this.chatsService.findOneChat(id)

    if (!chat) {
      throw new NotFoundException({
        success: false,
        message: `Can't find Chat with ID : ${id}`
      })
    }
    return {
      success: true,
      body: chat
    }
  }

  @ApiOperation({ summary: '채팅방 삭제 ', description: '채팅방을 삭제합니다' })
  @UseGuards(Guard)
  @Delete(':id')
  public async deleteChat(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.chatsService.deleteChat(id)

    return {
      success: true
    }
  }
}
