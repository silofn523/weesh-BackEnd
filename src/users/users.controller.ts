/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Guard } from 'src/auth/guard/auth.guard'

@ApiTags('User(사용자계정)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '사용자 회원가입', description: '사용자 정보를 추가합니다.' })
  @ApiBody({ type: CreateUserDto })
  @Post('/signup')
  public async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ success: boolean }> {
    const { email, username } = createUserDto

    await this.usersService.checkUserEmailAndUsername(email, username)
    await this.usersService.createUser(createUserDto)

    return { 
      success: true
    }
  }

  @ApiOperation({ summary: '관리자 회원가입', description: '관리자 정보를 추가합니다.' })
  @ApiBody({ type: CreateUserDto })
  @Post('/adminup')
  public async createAdmin(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ success: boolean }> {
    const { email, username } = createUserDto

    await this.usersService.checkUserEmailAndUsername(email, username)
    await this.usersService.createAdmin(createUserDto)

    return {
      success: true
    }
  }

  @ApiOperation({ summary: '사용자2 회원가입', description: '사용자2 정보를 추가합니다.' })
  @ApiBody({ type: CreateUserDto })
  @Post('/peerup')
  public async createPeer(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ success: boolean }> {
    const { email, username } = createUserDto

    await this.usersService.checkUserEmailAndUsername(email, username)
    await this.usersService.createPeer(createUserDto)

    return {
      success: true
    }
  }

  @ApiOperation({
    summary: '모든 사용자 정보 조회',
    description: '사용자 정보들을 불러옵니다.'
  })
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiOperation({
    summary: '하나의 사용자만 조회',
    description: '사용자 정보를 불러옵니다.'
  })
  @ApiBearerAuth('jwt')
  @UseGuards(Guard)
  @Get(':id')
  public async getOneUser(@Param('id') id: number): Promise<{ success: boolean; body: User | void }> {
    const user = await this.usersService.getOneUser(id)

    return {
      success: true,
      body: user
    }
  }

  @ApiOperation({
    summary: '비밀번호 수정',
    description: '비밀번호를 수정 합니다.'
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Put(':id/update/pw')
  public async updatePassword(@Param('id') id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<{ success: boolean }> {
    await this.usersService.getOneUser(id)
    await this.usersService.updatePassword(id, updateUserDto)

    return {
      success: true
    }
  }

  @ApiOperation({
    summary: '이름 & 이메일 수정',
    description: '이름 혹은 이메일을 수정 합니다.'
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Put(':id/update')
  public async updateName(@Param('id') id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<{ success: boolean }> {
    await this.usersService.getOneUser(id)
    await this.usersService.update(id, updateUserDto)

    return {
      success: true
    }
  }

  @ApiOperation({
    summary: '사용자 계정삭제',
    description: '사용자 계정을 삭제 합니다.'
  })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.usersService.deleteUser(id)

    return {
      success: true
    }
  }
}
