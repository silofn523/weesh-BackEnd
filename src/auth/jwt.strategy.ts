/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  public async validate(payload) {
    const { username } = payload
    const user: User = await this.user.findOneBy({ username })

    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: `invalid user token`
      })
    }

    return user
  }
}
