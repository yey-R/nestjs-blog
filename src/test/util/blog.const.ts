import { CreateBlogDto } from '../../../src/blog/dto/create-blog.dto';
import { Blog } from '../../../src/blog/entities/blog.entity';

export function getMockService() {
  return {
    create: jest.fn(),
    getAllBlogs: jest.fn(),
    getBlogById: jest.fn(),
    updateBlogById: jest.fn(),
    removeBlogById: jest.fn(),
  };
}

export function getMockRepository() {
  return {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneByOrFail: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };
}

export function createTestingBlog(): Blog {
  const dto = createTestingBlogDTO();

  return {
    ...dto,
    id: expect.any(Number),
    image: `images/test.jpg`,
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

export function createEmptyBlogDTO(): CreateBlogDto {
  return {
    title: '',
    content: '',
    shortContent: '',
    image: '',
  };
}
