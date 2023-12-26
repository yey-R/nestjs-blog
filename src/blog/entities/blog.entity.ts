import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @Column()
  shortContent: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  viewCount: number;
}
