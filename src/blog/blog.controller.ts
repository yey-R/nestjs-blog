import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
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

  @ApiCreatedResponse({
    type: Blog,
    description: 'Creates a blog and returns it',
  })
  @ApiBadRequestResponse({
    description: 'Missing required fields or invalid data.',
  })
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @ApiOkResponse({
    type: [Blog],
    description:
      'Returns all blogs. Returns an empty array if there is no blogs',
  })
  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @ApiOkResponse({ type: Blog, description: 'Returns a blog by id.' })
  @ApiBadRequestResponse({ description: 'Invalid id.' })
  @ApiNotFoundResponse({ description: 'Blog with the given id not found.' })
  @Get(':id')
  getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getBlogById(id);
  }

  @ApiOkResponse({
    type: Blog,
    description: 'Updates a blog by id and returns it',
  })
  @ApiBadRequestResponse({ description: 'Invalid id.' })
  @ApiNotFoundResponse({ description: 'Blog with the given id not found.' })
  @Patch(':id')
  updateBlogById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.updateBlogById(id, updateBlogDto);
  }

  @ApiOkResponse({
    type: Blog,
    description: 'Deletes a blog by id and returns the deleted blog',
  })
  @ApiBadRequestResponse({ description: 'Invalid id.' })
  @ApiNotFoundResponse({ description: 'Blog with the given id not found.' })
  @Delete(':id')
  removeBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.removeBlogById(id);
  }
}
