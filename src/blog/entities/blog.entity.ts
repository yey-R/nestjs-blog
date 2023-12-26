import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
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

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ default: 0 })
  viewCount: number;
}
