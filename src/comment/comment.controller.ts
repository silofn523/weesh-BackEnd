/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, NotFoundException, UseGuards } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Comment } from './entities/comment.entity'
import { Guard } from 'src/auth/guard/auth.guard'

@ApiTags('일반 상담후기')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '또상 후기쓰기',
    description: '또상 후기를 추가합니다.'
  })
  @ApiBody({ type: CreateCommentDto })
  @UseGuards(Guard)
  @Post()
  public async create(@Body(ValidationPipe) createCommentDto: CreateCommentDto): Promise<{ success: boolean }> {
    await this.commentService.createComment(createCommentDto)

    return {
      success: true
    }
  }

  @ApiOperation({
    summary: '모든 또상 상담 후기 조회',
    description: '상담 정보들을 불러옵니다.'
  })
  @UseGuards(Guard)
  @Get()
  public findAll(): Promise<Comment[]> {
    return this.commentService.findAll()
  }

  @ApiOperation({
    summary: '하나의 또상 상담 후기만 조회',
    description: '또상 상담 후기 정보를 불러옵니다.'
  })
  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<{ success: boolean; body: Comment }> {
    const comment = await this.commentService.findOne(id)

    if (!comment) {
      throw new NotFoundException({
        success: false,
        message: `Can't find Comment with ID : ${id}`
      })
    }
    return {
      success: true,
      body: comment
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.commentService.remove(id)

    return {
      success: true
    }
  }
}
