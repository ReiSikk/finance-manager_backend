import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class EntryService {

  constructor(
  @InjectRepository(Entry)
  private entryRepository: Repository<Entry>,
  @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async create(createEntryDto: CreateEntryDto, user: User) {
    let category = await this.categoryRepository.findOne({ where: { name: createEntryDto.category.name } });


    if (!category) {
      category = this.categoryRepository.create({ name: createEntryDto.category.name });
      await this.categoryRepository.save(category);
  }

  const entry = this.entryRepository.create(createEntryDto);
  entry.category = category;
  entry.user = user;
    return this.entryRepository.save(entry)
  }

  findAll(user: User) {
    return this.entryRepository.find({
      where: { user: { id: user.id } }
    })
  }

  findOne(id: number) {
    return this.entryRepository.findOneBy({id});
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return this.entryRepository.update(id, updateEntryDto)
  }

  remove(id: number) {
    return this.entryRepository.delete(id);
  }
}