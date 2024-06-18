/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '닉네임', default: 'hodu' })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ description: '비밀번호', default: 'test' })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @'
  })
  readonly password: string
}
