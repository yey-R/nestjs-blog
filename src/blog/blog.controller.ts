import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { BlogInterceptor } from './blog.interceptor';

@ApiTags('blog')
@UseInterceptors(BlogInterceptor)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiCreatedResponse({ type: Blog })
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @ApiOkResponse({ type: [Blog] })
  @Get()
  findAll() {
    return this.blogService.getAllBlogs();
  }

  @ApiOkResponse({ type: Blog })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }

  @ApiOkResponse({ type: Blog })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.updateBlogById(id, updateBlogDto);
  }

  @ApiOkResponse({ type: Blog })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.removeBlogById(id);
  }
}
