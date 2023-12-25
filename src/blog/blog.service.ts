import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>,) {}

  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = this.blogRepository.create(createBlogDto);

    return this.blogRepository.save(newBlog);
  }

  getAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOneByOrFail({ id: id });

    blog.viewCount++;
    
    return await this.blogRepository.save(blog);;
  }

  async updateBlogById(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOneByOrFail({ id: id });
    const updatedBlog = this.blogRepository.merge(blog, updateBlogDto);

    return this.blogRepository.save(updatedBlog);
  }

  async removeBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOneByOrFail({ id: id });

    return this.blogRepository.remove(blog);
  }
}
