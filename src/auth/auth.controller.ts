/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/Login.Dto'
import { Guard } from './guard/auth.guard'
import { Request } from 'express'

@ApiTags('로그인')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '로그인',
    description: '사용자 혹은 관리자로 로그인 합니다.'
  })
  @ApiBearerAuth()
  @ApiBody({ type: LoginDto })
  @Post('/signIn')
  public async asingIn(@Body() dto: LoginDto): Promise<{ success: boolean; token: string }> {
    return await this.authService.sinIn(dto)
  }

  @ApiOperation({
    summary: '토큰 만료 체크',
    description: '아 시발 잘라했는데 좆같네'
  })
  @UseGuards(Guard)
  @Get('/check_token')
  public checkToken(@Req() req: Request) {
    // Authorization: Bearer eYj...  형식의 헤더에서 토큰 값 추출 (eYj...)
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException({
        success: false,
        message: 'Authorization header missing'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException({
        success: false,
        message: 'Token missing'
      });
    }
    const userId = this.authService.verifyToken(token)

    return {
      success: true,
      body: {
        userId
      }
    }
  }
}

