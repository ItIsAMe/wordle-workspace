import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WordCheckerModule } from './word/word.module';
import { IdModule } from './id/id.module';
import { join } from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
  imports: [WordCheckerModule,
    IdModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      //host: 'localhost',
      host:  process.env.HOST,
      port: 3306,
     // username: 'root',
     // password: 'pass',
      //database:'wordle',
      autoLoadEntities: true,
      username:  process.env.USERNAME,
      password: process.env.PASSWORD,
      database:'heroku_00a972e8693a723',
  }),
   ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'wordle'),
        exclude: ['/api*']
      }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
