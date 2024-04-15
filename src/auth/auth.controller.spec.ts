import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should grant admin access', () => {
    return request(app.getHttpServer())
      .post('/auth/upgrade')
      .auth('access_token', { type: 'bearer' })
      .expect(200)
      .expect({ success: true });
  });

  afterAll(async () => {
    await app.close();
  });
});