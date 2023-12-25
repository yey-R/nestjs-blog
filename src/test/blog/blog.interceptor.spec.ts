import { BlogInterceptor } from '../../blog/blog.interceptor';
import { of } from 'rxjs';
import { Blog } from '../../blog/entities/blog.entity';
import { createTestingBlog, getTestImagePath } from '../util/blog.const';

describe('ResponseInterceptor', () => {
  let interceptor: BlogInterceptor;

  beforeEach(() => {
    interceptor = new BlogInterceptor();
  });

  it('should map the data', (done) => {
    const mockBlog: Blog = createTestingBlog();
    const imagePath: string = getTestImagePath(mockBlog);

    const obs = interceptor.intercept({} as any, {
      handle: () => of(mockBlog),
    });

    obs.subscribe({
      next: (val) => {
        expect(val).toEqual({
          ...mockBlog,
          image: imagePath,
        });
      },
      complete: () => done(),
    });
  });
});
