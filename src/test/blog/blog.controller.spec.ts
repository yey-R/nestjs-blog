import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from '../../blog/blog.controller';
import { BlogService } from '../../blog/blog.service';
import { Blog } from '../../blog/entities/blog.entity';
import { CreateBlogDto } from '../../blog/dto/create-blog.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConfigModule } from '@nestjs/config';
import {
  createEmptyBlogDTO,
  createTestingBlog,
  createTestingBlogDTO,
  createTestingUpdatedBlogDTO,
} from '../util/blog.const';
import { getMockService } from '../util/blog.const';

const mockService = getMockService();

describe('BlogController', () => {
  let controller: BlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new blog', async () => {
      const mockBlog: Blog = createTestingBlog();
      const blogDto = createTestingBlogDTO();

      mockService.create.mockResolvedValue(mockBlog);

      expect(await controller.create(blogDto)).toBe(mockBlog);
    });

    it('should have empty error', async () => {
      const blogDto = createEmptyBlogDTO();

      const ofBlogDTO = plainToInstance(CreateBlogDto, blogDto);
      const errors = await validate(ofBlogDTO);

      expect(errors.length).toBe(3);
      expect(errors[0].constraints.isNotEmpty).toBe(
        'title should not be empty',
      );
      expect(errors[1].constraints.isNotEmpty).toBe(
        'content should not be empty',
      );
      expect(errors[2].constraints.isNotEmpty).toBe(
        'shortContent should not be empty',
      );
    });
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = [];

      mockService.getAllBlogs.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return an array of blogs', async () => {
      const mockBlog: Blog = createTestingBlog();
      const result = [mockBlog];

      mockService.getAllBlogs.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single blog', async () => {
      const mockBlog: Blog = createTestingBlog();

      mockService.getBlogById.mockResolvedValue(mockBlog);

      expect(await controller.findOne(1)).toBe(mockBlog);
    });
  });

  describe('update', () => {
    it('should update a blog', async () => {
      const mockBlog: Blog = createTestingBlog();
      const updateBlogDto = createTestingUpdatedBlogDTO();

      mockService.updateBlogById.mockResolvedValue(mockBlog);

      expect(await controller.update(1, updateBlogDto)).toStrictEqual(mockBlog);
    });
  });

  describe('remove', () => {
    it('should return the deleted blog', async () => {
      const mockBlog: Blog = createTestingBlog();

      mockService.removeBlogById.mockResolvedValue(mockBlog);

      expect(await controller.remove(1)).toBe(mockBlog);
    });
  });
});
