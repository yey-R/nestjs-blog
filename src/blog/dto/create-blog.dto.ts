import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  shortContent: string;

  @ApiProperty({ required: false })
  @Matches('^$|^(/{0,1}(?!/))[A-Za-z0-9/_-]+(.([a-zA-Z]+))?$')
  @IsOptional()
  image?: string;
}
