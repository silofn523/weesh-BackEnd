/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, NotFoundException, UseGuards } from '@nestjs/common'
import { AdminCommentService } from './admin-comment.service'
import { CreateAdminCommentDto } from './dto/create-admin-comment.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminComment } from './entities/admin-comment.entity'
import { Guard } from 'src/auth/guard/auth.guard'

@ApiTags('관리자 상담후기')
@Controller('admin-comment')
export class AdminCommentController {
  constructor(private readonly adminCommentService: AdminCommentService) {}

  @ApiOperation({
    summary: '후기쓰기',
    description: '관리자 후기를 추가합니다.'
  })
  @ApiBody({ type: CreateAdminCommentDto })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Post()
  public async create(@Body(ValidationPipe) createAdminCommentDto: CreateAdminCommentDto): Promise<{ success: boolean }> {
    await this.adminCommentService.createAdminComment(createAdminCommentDto)

    return {
      success: true
    }
  }

  @ApiOperation({
    summary: '모든 관리자 상담 후기 조회',
    description: '관리자 상담 후기 정보들을 불러옵니다.'
  })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Get()
  public findAll() {
    return this.adminCommentService.findAll()
  }

  @ApiOperation({
    summary: 'ID에 맞는 관리자 상담 후기만 조회',
    description: '관리자 상담 후기 정보를 불러옵니다.'
  })
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<{ success: boolean; body: AdminComment }> {
    const AdminComment = await this.adminCommentService.findOne(id)

    if (!AdminComment) {
      throw new NotFoundException({
        success: false,
        message: `Can't find AdminComment with ID : ${id}`
      })
    }
    return {
      success: true,
      body: AdminComment
    }
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<{ success: boolean }> {
    return this.adminCommentService.remove(id)
  }
}
