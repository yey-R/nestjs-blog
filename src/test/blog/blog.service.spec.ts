import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '../../blog/blog.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { Repository } from 'typeorm';
import {
  createTestingBlog,
  createTestingBlogDTO,
  updateTestingBlog,
} from '../util/blog.const';
import { getMockRepository } from '../util/blog.const';

const mockRepository = getMockRepository();

describe('BlogService', () => {
  let service: BlogService;
  let repository: Repository<Blog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getRepositoryToken(Blog),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    repository = module.get<Repository<Blog>>(getRepositoryToken(Blog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new blog post', async () => {
      const createBlogDto = createTestingBlogDTO();

      mockRepository.create(createBlogDto);
      mockRepository.save.mockResolvedValue(createBlogDto);

      expect(await service.create(createBlogDto)).toEqual(createBlogDto);
      expect(repository.create).toHaveBeenCalledWith(createBlogDto);
      expect(repository.save).toHaveBeenCalledWith(createBlogDto);
    });
  });

  describe('getBlogById', () => {
    it('should return a single blog', async () => {
      const blog = createTestingBlog();

      mockRepository.findOneByOrFail.mockResolvedValue(blog);
      mockRepository.save.mockResolvedValue(blog);

      expect(await service.getBlogById(1)).toEqual(blog);
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(repository.save).toHaveBeenCalledWith({
        ...blog,
        viewCount: 1,
      });
    });
  });

  describe('updateBlogById', () => {
    it('should update a blog successfully', async () => {
      const blog = createTestingBlog();
      const updatedBlog = updateTestingBlog();
      const updateBlogDto = createTestingBlogDTO();

      mockRepository.findOneByOrFail.mockResolvedValue(blog);
      mockRepository.merge.mockReturnValue(updatedBlog);
      mockRepository.save.mockResolvedValue(updatedBlog);

      expect(await service.updateBlogById(1, updateBlogDto)).toEqual(
        updatedBlog,
      );
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(repository.merge).toHaveBeenCalledWith(blog, updateBlogDto);
      expect(repository.save).toHaveBeenCalledWith(updatedBlog);
    });
  });

  describe('removeBlogById', () => {
    it('should remove the blog successfully', async () => {
      const blogToRemove = createTestingBlog();

      mockRepository.findOneByOrFail.mockResolvedValue(blogToRemove);
      mockRepository.remove.mockResolvedValue(blogToRemove);

      expect(await service.removeBlogById(1)).toEqual(blogToRemove);
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(repository.remove).toHaveBeenCalledWith(blogToRemove);
    });
  });

  describe('findOneOrFail', () => {
    it('should throw an error if no blog is found', async () => {
      mockRepository.findOneByOrFail.mockRejectedValue(
        new Error('Blog not found'),
      );

      await expect(service.getBlogById(999)).rejects.toThrow('Blog not found');
    });
  });
});
