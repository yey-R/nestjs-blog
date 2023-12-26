import { Blog } from '../../blog/entities/blog.entity';
import { createTestingBlog } from '../util/blog.const';
import { ImageFullPath } from '../../common/utils/ImageFullPath';
import { ConfigModule } from '@nestjs/config';

describe('ImageFullPath', () => {
  beforeAll(() => {
    ConfigModule.forRoot();
  });

  describe('create', () => {
    it('should create a full-path for image', () => {
      const mockBlog: Blog = createTestingBlog();

      expect(ImageFullPath(mockBlog.id, mockBlog.image)).toBe(
        `${process.env.UPLOAD_URL}/${mockBlog.id}/${mockBlog.image}`,
      );
    });
  });
});
