/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class EnterChatDto {
  @ApiProperty({ description: '채팅방 Id', default: '1' })
  @IsNumber({}, { each: true })
  readonly chatId: number[]
}
