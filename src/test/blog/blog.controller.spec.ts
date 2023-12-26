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

    it('should have unmatch error for image', async () => {
      const blogDto = createTestingBlogDTO();

      const ofBlogDTO = plainToInstance(CreateBlogDto, {
        ...blogDto,
        image: '//test',
      });
      const errors = await validate(ofBlogDTO);

      expect(errors.length).toBe(1);
      expect(errors[0].constraints.matches).toBe(
        'image must match ^$|^(/{0,1}(?!/))[A-Za-z0-9/_-]+(.([a-zA-Z]+))?$ regular expression',
      );
    });
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = [];

      mockService.getAllBlogs.mockResolvedValue(result);

      expect(await controller.getAllBlogs()).toBe(result);
    });

    it('should return an array of blogs', async () => {
      const mockBlog: Blog = createTestingBlog();
      const result = [mockBlog];

      mockService.getAllBlogs.mockResolvedValue(result);

      expect(await controller.getAllBlogs()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single blog', async () => {
      const mockBlog: Blog = createTestingBlog();

      mockService.getBlogById.mockResolvedValue(mockBlog);

      expect(await controller.getBlogById(1)).toBe(mockBlog);
    });
  });

  describe('update', () => {
    it('should update a blog', async () => {
      const updateBlog: Blog = {
        ...createTestingBlog(),
        title: 'Updated title',
      };
      const updateBlogDto: CreateBlogDto = {
        ...createTestingBlogDTO(),
        title: 'Updated title',
      };

      mockService.updateBlogById.mockResolvedValue(updateBlog);

      expect(await controller.updateBlogById(1, updateBlogDto)).toStrictEqual(
        updateBlog,
      );
    });
  });

  describe('remove', () => {
    it('should return the deleted blog', async () => {
      const mockBlog: Blog = createTestingBlog();

      mockService.removeBlogById.mockResolvedValue(mockBlog);

      expect(await controller.removeBlogById(1)).toBe(mockBlog);
    });
  });
});
