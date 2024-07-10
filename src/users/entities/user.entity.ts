/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { AdminComment } from 'src/admin-comment/entities/admin-comment.entity'
import { Chat } from 'src/chats/entities/chat.entity'
import { Messages } from 'src/chats/messages/entities/messages.entity'
import { Comment } from 'src/comment/entities/comment.entity'
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'users'
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ unique: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  readonly username: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @'
  })
  readonly password: string

  @Column({ unique: true })
  @IsEmail() // 이메일 양식확인
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'email :('
  })
  readonly email: string

  @Column()
  @IsString()
  readonly role: 'user' | 'admin' | 'peer'

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  readonly comment: Comment[]

  @OneToMany(() => AdminComment, (adminComment) => adminComment.user, { eager: true })
  readonly adminComment: AdminComment[]

  @ManyToMany(() => Chat, (chat) => chat.users, { onDelete: 'CASCADE' })
  @JoinTable()
  readonly chats: Chat[]

  @OneToMany(() => Messages, (message) => message.author)
  readonly messages: Messages
}
