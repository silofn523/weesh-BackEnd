/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'

// 상담 후기 & 별점
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly comment: Repository<Comment>
  ) {}

  public async createComment(createCommentDto: CreateCommentDto): Promise<void> {
    await this.comment.insert({
      scope: createCommentDto.scope,
      feedback: createCommentDto.feedback,
      userId: createCommentDto.userId
    })
  }

  public findAll(): Promise<Comment[]> {
    return this.comment.find()
  }

  public async findOne(id: number): Promise<Comment> {
    return await this.comment.findOneBy({ id })
  }

  public async remove(id: number): Promise<void> {
    const resuit = await this.comment.delete({ id })

    if (resuit.affected === 0) {
      throw new NotFoundException({
        success: false,
        message: `Can't find Comment with ID : ${id}`
      })
    }
  }
}
