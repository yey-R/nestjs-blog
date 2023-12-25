import { CreateBlogDto } from 'src/blog/dto/create-blog.dto';
import { Blog } from 'src/blog/entities/blog.entity';

export function createTestingBlog(): Blog {
  return {
    title: 'Test',
    content: 'Test content',
    shortContent: 'Test short content',
    id: 1,
    image: `images/test.jpg`,
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 0,
  };
}

export function getTestImagePath(blog: Blog): string {
  return `${process.env.UPLOAD_URL}/${blog.id}/${blog.image}`;
}

export function updateTestingBlog(): Blog {
  return {
    title: 'Updated Test',
    content: 'Updated Content',
    shortContent: 'Updated Short contet',
    image: `images/test.jpg`,
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 0,
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

export function createTestingUpdatedBlogDTO(): CreateBlogDto {
  return {
    title: 'Updated Test',
    content: 'Updated Content',
    shortContent: 'Updated Short contet',
    image: `images/test.jpg`,
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
