import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiCreatedResponse({ type: Blog })
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() file: Express.Multer.File) {
    return this.blogService.create(createBlogDto);
  }

  @ApiOkResponse({type: [Blog]})
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @ApiOkResponse({type: Blog})
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @ApiOkResponse({type: Blog})
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @ApiOkResponse({type: Blog})
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }
}
