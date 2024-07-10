/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity'
import { BaseEntity, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Messages } from '../messages/entities/messages.entity'

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number

  @ManyToMany(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  readonly users: User[]

  @OneToMany(() => Messages, (messages) => messages.chat, { cascade: true })
  readonly messages: Messages
}
