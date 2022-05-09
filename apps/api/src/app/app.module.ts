import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordCheckerModule } from './word/word.module';

@Module({
  imports: [WordCheckerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
