import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BlogModule } from 'src/blog/blog.module';

describe('BlogController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BlogModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/blog (GET)', () => {
    return request(app.getHttpServer())
      .get('/blog')
      .expect(200)
      .expect('Hello World!');
  });
});
