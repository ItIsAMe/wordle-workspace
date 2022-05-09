import { WordCheckerController } from './wordChecker.controller';
import { Module } from "@nestjs/common";
import { WordService } from './word.service';

@Module({
    imports: [],
    providers:[WordService],
    controllers: [WordCheckerController]
})
export class WordCheckerModule {}