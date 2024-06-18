/* eslint-disable prettier/prettier */
import { PickType } from '@nestjs/mapped-types'
import { Messages } from '../entities/messages.entity'
import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMessageDto extends PickType(Messages, ['message']) {
  @ApiProperty({ description: '채팅방 Id', default: '1' })
  @IsNumber()
  readonly chatId: number

  @ApiProperty({ description: '보내는 유저Id', default: '1' })
  @IsNumber()
  readonly authorId: number
}
