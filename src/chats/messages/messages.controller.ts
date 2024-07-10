/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, UseGuards, ValidationPipe } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Guard } from 'src/auth/guard/auth.guard'

@ApiTags('Messages')
@Controller('chats/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({ summary: '채팅 내용 삭제 ', description: '채팅 내용을 삭제합니다' })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Delete(':id')
  public async deleteMessages(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.messagesService.deleteMessages(id)

    return {
      success: true
    }
  }

  @ApiOperation({ summary: '채팅 내용 수정 ', description: '여기서 받는 ID는 메시지 ID를 받습니다' })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Patch(':id')
  public async updateMessages(@Param('id') id: number, @Body(ValidationPipe) message: { message: string }): Promise<{ success: boolean }> {
    const messages = await this.messagesService.getOneMessage(id)
    await this.messagesService.updateMessages(id, message.message)

    if (!messages) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 메시지를 찾지 못했습니다`
      })
    }
    console.log(message)
    return {
      success: true
    }
  }

  @ApiOperation({ summary: '챗 방별로 메시지 조회', description: '여기서 받는 ID는 채팅방 ID를 받습니다' })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Get(':id')
  public findAllChatMessage(@Param('id') id: string) {
    return this.messagesService.findAll(+id)
  }
}
