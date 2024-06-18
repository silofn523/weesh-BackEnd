/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/Login.Dto'

@ApiTags('로그인')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '사용자 혹은 관리자로 로그인 합니다.'
  })
  @ApiBearerAuth()
  @ApiBody({ type: LoginDto })
  @Post('/signIn')
  public async asingIn(@Body() createUserDto: CreateUserDto): Promise<{ success: boolean; token: string }> {
    return await this.authService.sinIn(createUserDto)
  }
}
