/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotAcceptableException, UnauthorizedException } from '@nestjs/common'
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/Login.Dto'
import * as bcrypt from 'bcryptjs'

// 인증
@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UsersService
  ) {}

  public async sinIn(dto: LoginDto): Promise<{ success: boolean; token: string }> {
    const user = await this.userService.getOneName(dto.username)

    if (!user || undefined) {
      throw new UnauthorizedException({
        success: false,
        message: `Invalid username : ${dto.username}`
      })
    }

    const isPasswordValidated = await bcrypt.compare(dto.password, user.password)

    if (!isPasswordValidated || undefined) {
      throw new UnauthorizedException({
        success: false,
        message: `Invalid password`
      })
    }

    const payload =  user.id 
    const token = this.jwt.sign({ payload })

    return {
      success: true,
      token: token
    }
  }

  public verifyToken(token: string) {
    try {
      const userId = this.jwt.verify(token) as { id: number }
      return userId
    } catch (e) {
      if (e instanceof JsonWebTokenError)
        throw new NotAcceptableException('TOKEN_MALFORMED')

      if (e instanceof TokenExpiredError)
        throw new UnauthorizedException('TOKEN_EXPIRED')

      throw new InternalServerErrorException('JWT_SERVICE_ERROR')
    }
  }
}
