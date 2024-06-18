/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { AdminCommentService } from './admin-comment.service'
import { AdminCommentController } from './admin-comment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminComment } from './entities/admin-comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AdminComment])],
  controllers: [AdminCommentController],
  providers: [AdminCommentService]
})
export class AdminCommentModule {}
