import { SelectedWord } from './selected-word.entity';
import { WordService } from './word.service';
import { Word } from './word.entity';
import { WordCheckerController } from './word-checker.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Word, SelectedWord])],
    providers:[WordService],
    controllers: [WordCheckerController],
})
export class WordCheckerModule {}