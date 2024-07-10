/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

// 일반 유저계정
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt()
    const password = await this.hashPassword(createUserDto.password, salt)

    await this.user.insert({
      username: createUserDto.username,
      email: createUserDto.email,
      password,
      role: 'user'
    })
  }

  public async createAdmin(createUserDto: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt()
    const password = await this.hashPassword(createUserDto.password, salt)

    await this.user.insert({
      username: createUserDto.username,
      email: createUserDto.email,
      password,
      role: 'admin'
    })
  }

  public async createPeer(createUserDto: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt()
    const password = await this.hashPassword(createUserDto.password, salt)

    await this.user.insert({
      username: createUserDto.username,
      email: createUserDto.email,
      password,
      role: 'peer'
    })
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  public async checkUserEmailAndUsername(email: string, username: string): Promise<void> {
    const existing = await this.user.findOne({
      where: [{ email }, { username }]
    })

    if (existing) {
      if (existing.email === email) {
        throw new ConflictException({
          success: false,
          message: `${email}은 이미 사용중인 이메일 입니다`
        })
      }

      if (existing.username === username) {
        throw new ConflictException({
          success: false,
          message: `${username}은 이미 사용중인 이름 입니다`
        })
      }
    }
  }

  public async findAll(): Promise<User[]> {
    return await this.user.find()
  }

  public async getOneUser(id: number): Promise<void | User> {
    const user = await this.user.findOneBy({ id })

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`
      })
    }
    return user
  }

  public async getOneName(username: string): Promise<User> {
    return await this.user.findOne({ 
      where: {
        username
      }
    })
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.user.delete({ id })

    if (user.affected === 0) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 사용자를 찾지 못했습니다`
      })
    }
  }

  public async updatePassword(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt()
    const updatePassword = await this.hashPassword(updateUserDto.password, salt)

    await this.user.update({ id }, { password: updatePassword })
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.checkUserEmailAndUsername(updateUserDto.email, updateUserDto.username)
    await this.user.update({ id }, updateUserDto)
  }
}
