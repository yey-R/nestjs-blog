import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../orm.config';
import { ConfigModule } from '@nestjs/config';
import { Blog } from './blog/entities/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...config, entities: [Blog] }),
    BlogModule,
  ],
})
export class AppModule {}
