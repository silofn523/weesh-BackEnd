/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CreateChatDto {
  @ApiProperty({ description: '유저 고유Id', default: '1, 2' })
  @IsNumber({}, { each: true })
  readonly userId: number[]
}
