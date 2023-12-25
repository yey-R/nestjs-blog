import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    BlogModule, 
  ],
})
export class AppModule {}
