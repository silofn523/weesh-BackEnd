/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAdminCommentDto } from './dto/create-admin-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AdminComment } from './entities/admin-comment.entity'
import { Repository } from 'typeorm'

// 선생님 상담 후기
@Injectable()
export class AdminCommentService {
  constructor(
    @InjectRepository(AdminComment)
    private readonly adminComment: Repository<AdminComment>
  ) {}

  public async createAdminComment(createAdminCommentDto: CreateAdminCommentDto): Promise<void> {
    await this.adminComment.insert({
      feedback: createAdminCommentDto.feedback,
      userId: createAdminCommentDto.userId
    })
  }

  findAll(): Promise<AdminComment[]> {
    return this.adminComment.find()
  }

  public async findOne(id: number): Promise<AdminComment> {
    return await this.adminComment.findOneBy({ id })
  }

  public async remove(id: number): Promise<{ success: boolean }> {
    const resuit = await this.adminComment.delete({ id })

    if (resuit.affected === 0) {
      throw new NotFoundException({
        success: false,
        message: `Can't find AdminComment with ID : ${id}`
      })
    }
    return {
      success: true
    }
  }
}
