import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../src/blog/blog.module';
import { Blog } from '../src/blog/entities/blog.entity';
import testConfig from './test-orm.config';
import * as request from 'supertest';
import { CreateBlogDto } from '../src/blog/dto/create-blog.dto';
import {
  createTestingBlogDTO,
  createTestingBlog,
} from './constants/blog.e2e.constans';
import { DataSource, Timestamp } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { EntityNotFoundErrorFilter } from '../src/common/filters/EntityNotFoundErrorFilter';

describe('BlogController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...testConfig,
            dropSchema: true,
            entities: [Blog],
          }),
        }),
        AppModule,
        BlogModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityNotFoundErrorFilter());

    app.useGlobalPipes(
      new ValidationPipe({
        always: true,
        transform: true,
        whitelist: true,
        disableErrorMessages: false,
        forbidNonWhitelisted: false,
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new BadRequestException(validationErrors);
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Blog).execute();

    await app.close();
  });

  describe('Before creating any blog posts', () => {
    it('/blog (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/blog');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('/blog/:id (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/blog/999');

      expect(res.status).toBe(404);
      expect(res.body.message).toEqual(
        'An entity with the given id is not Found',
      );
    });

    it('/blog/:id (PATCH)', async () => {
      const res = await request(app.getHttpServer())
        .patch('/blog/999')
        .send({});

      expect(res.status).toBe(404);
      expect(res.body.message).toEqual(
        'An entity with the given id is not Found',
      );
    });
  });

  describe('After creating a blog post', () => {
    it('/blog (POST)', async () => {
      const blogDTO: CreateBlogDto = createTestingBlogDTO();
      const blog: Blog = createTestingBlog();

      const res = await request(app.getHttpServer())
        .post('/blog')
        .send(blogDTO);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(blog);
    });

    it('/blog (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/blog');
      const blog: Blog = createTestingBlog();

      expect(res.status).toBe(200);
      expect(res.body).toEqual([blog]);
    });

    it('/blog/:id (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/blog/1');
      const blog: Blog = createTestingBlog();

      expect(res.status).toBe(200);
      expect(res.body).toEqual(blog);
    });

    it('/blog/:id (PATCH)', async () => {
      const res = await request(app.getHttpServer())
        .patch('/blog/1')
        .send({ title: 'Blog updated' });
      const blog: Blog = createTestingBlog();

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...blog, title: 'Blog updated' });
    });
  });

  describe('Non-numeric id', () => {
    it('/blog/:id (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/blog/aaa');

      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(
        'Validation failed (numeric string is expected)',
      );
    });

    it('/blog/:id (GET)', async () => {
      const res = await request(app.getHttpServer())
        .patch('/blog/aaa')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(
        'Validation failed (numeric string is expected)',
      );
    });
  });
});
