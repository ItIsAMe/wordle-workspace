import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WordCheckerModule } from './word/word.module';
@Module({
  imports: [WordCheckerModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password:'pass',
      database:'wordle',
      autoLoadEntities: true,
      synchronize: true,
  })
],
  controllers: [],
  providers: [],
})
export class AppModule {}
