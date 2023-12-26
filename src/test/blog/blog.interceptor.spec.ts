import { BlogInterceptor } from '../../blog/blog.interceptor';
import { of } from 'rxjs';
import { Blog } from '../../blog/entities/blog.entity';
import { createTestingBlog } from '../util/blog.const';
import { ConfigModule } from '@nestjs/config';

describe('ResponseInterceptor', () => {
  let interceptor: BlogInterceptor;

  beforeEach(() => {
    ConfigModule.forRoot();
    interceptor = new BlogInterceptor();
  });

  it('should map the single data', (done) => {
    const mockBlog: Blog = createTestingBlog();

    const obs = interceptor.intercept({} as any, {
      handle: () => of(mockBlog),
    });

    obs.subscribe({
      next: (val) => {
        expect(val).toEqual({
          ...mockBlog,
        });
      },
      complete: () => done(),
    });
  });

  it('should map the array of data', (done) => {
    const mockBlog: Blog = createTestingBlog();

    const obs = interceptor.intercept({} as any, {
      handle: () => of([mockBlog]),
    });

    obs.subscribe({
      next: (val) => {
        expect(val).toEqual([
          {
            ...mockBlog,
          },
        ]);
      },
      complete: () => done(),
    });
  });
});
