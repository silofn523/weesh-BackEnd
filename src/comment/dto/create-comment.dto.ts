/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ description: '별점', default: 5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'The value must be at least 1.' })
  @Max(5, { message: 'The value must not exceed 5.' })
  readonly scope: number // 별점

  @ApiProperty({ description: '후기', default: '좋아요' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  readonly feedback: string // 상담 후기 & 피드백

  @ApiProperty({ description: '받는 유저 Id', default: '1' })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number
}
