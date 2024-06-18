/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateAdminCommentDto {
  @ApiProperty({ description: '후기', default: '좋아요' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  readonly feedback: string

  @ApiProperty({ description: '받는 유저 Id', default: '1' })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number
}
