/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import { User } from 'src/users/entities/user.entity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'The value must be at least 1.' })
  @Max(5, { message: 'The value must not exceed 5.' })
  readonly scope: number // 별점

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  readonly feedback: string // 상담 후기 & 피드백

  @Column()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number // 받는 유저 ID

  @ManyToOne(() => User, (user) => user.comment, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  readonly user: User
}
