import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateEntryDto } from '../src/entry/dto/create-entry.dto'
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { Category } from "../src/categories/entities/category.entity"
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { getRepositoryToken } from '@nestjs/typeorm';




describe('AppController (e2e)', () => {
  let app: INestApplication;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    categoriesService = moduleFixture.get(CategoriesService);

    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  describe('/ (GET) entry controller', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
})


  describe('/ (POST) entry controller', () => {
    it('should create a new entry when passed a valid entry', async () => {

      const savedCategory = await categoriesService.create(new CreateCategoryDto("Take-out"));
      console.log(savedCategory, "savedCategory");

        const validEntry = new CreateEntryDto(100, new Date(), 'DKK', 'Frankies Pizza', 'Takeout', "A mediocre pizza");
        validEntry.category = savedCategory;


        const {body} = await request(app.getHttpServer())
        .post('/entry')
        .send(validEntry)
        .expect(201)

        console.log("saved entry", body);

        expect(body.amount).toEqual(100);
        expect(body.id).toBeDefined()
    })
    it('should return error message when passed an invalid entry', async () => {
      const inValidEntry = new CreateEntryDto(100, new Date(), 'DKK', 'sihsihs', 'Whatever', "A mediocre pizza");

      const {body} = await request(app.getHttpServer())
      .post('/entry')
      .send(inValidEntry)
      .expect(400)

      expect(body.message[0].toEqual('name should not be empty'))
    })
    
  })

/*   afterEach(async () => {
    await financeRepository
  }) */
});
