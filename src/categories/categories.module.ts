import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from 'src/entry/entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Entry])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}