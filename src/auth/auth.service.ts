/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
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

    const payload = { username: dto.username }
    const token = this.jwt.sign(payload)

    return {
      success: true,
      token: token
    }
  }
}
