/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator'
import { Chat } from 'src/chats/entities/chat.entity'
import { User } from 'src/users/entities/user.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  readonly id: number

  @Column()
  @IsNumber()
  readonly chatId: number

  @ManyToOne(() => Chat, (chat) => chat.messages)
  readonly chat: Chat

  @ManyToOne(() => User, (user) => user.messages)
  readonly author: User

  @Column()
  @IsString()
  readonly message: string
}
