import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateEntryDto } from '../src/entry/dto/create-entry.dto'
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/ (POST) entry controller', () => {
    it('should create a new entry when passed a valid entry', async () => {
        const validEntry = new CreateEntryDto(100, new Date(), 'DKK', 'Frankies Pizza', 'Takeout')
        app.useGlobalPipes(new ValidationPipe())
        const {body} = await request(app.getHttpServer())
        .post('/entry')
        .send(validEntry)
        .expect(201)

        expect(body.amount).toEqual(100);
        expect(body.id).toBeDefined()
        console.log(body);
    

    })
    
  })
});
