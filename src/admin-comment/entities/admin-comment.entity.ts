/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { User } from 'src/users/entities/user.entity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AdminComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  readonly feedback: string // 상담 후기 & 피드백

  @Column()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number // 받는 선생님 ID

  @ManyToOne(() => User, (user) => user.adminComment, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  readonly user: User
}
