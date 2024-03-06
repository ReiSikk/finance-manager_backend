import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) 
    private categoryRepository: Repository<Category>) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({id});
  }

  update(id: number, updateEntryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateEntryDto)
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}