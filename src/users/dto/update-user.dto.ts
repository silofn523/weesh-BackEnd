/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '닉네임', default: 'hodu' })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  readonly username: string

  @ApiProperty({ description: '비밀번호', default: '1234' })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @'
  })
  readonly password: string

  @ApiProperty({ description: '이메일', default: 'test@test.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'email :('
  })
  readonly email: string
}
