import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        {
          provide: getRepositoryToken(Entry),
          useValue: {}, // Add your mock methods here
        },
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
