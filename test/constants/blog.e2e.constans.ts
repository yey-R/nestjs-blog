import { Blog } from '../../src/blog/entities/blog.entity';
import { CreateBlogDto } from '../../src/blog/dto/create-blog.dto';

export function createTestingBlog(): Blog {
  const dto: CreateBlogDto = createTestingBlogDTO();

  return {
    ...dto,
    id: 1,
    image: 'http://localhost:3000/uploads/1/images/test.jpg',
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    viewCount: expect.any(Number),
  };
}

export function createTestingBlogDTO(): CreateBlogDto {
  return {
    title: 'Test Blog',
    content: 'Content',
    shortContent: 'Short contet',
    image: 'images/test.jpg',
  };
}
