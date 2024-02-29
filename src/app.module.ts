import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntryModule } from './entry/entry.module';
import { dbConfig } from '../data.source';


//TODO:  Addthe following(url:: process.env.DATABASE_URL) to the app.module.ts
//TODO: Set up github actions

@Module({
 imports: [
   ConfigModule.forRoot({ isGlobal: true }),
     // Directly use dataSource for TypeORM configuration
    TypeOrmModule.forRoot(dbConfig),
    EntryModule,
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}



3