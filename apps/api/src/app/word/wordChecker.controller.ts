import { WordService } from './word.service';
import { WordCheckDto } from '../../../../../libs/api-interfaces/src/lib/word.dto';
import { Body, Controller, Put } from '@nestjs/common';
import { WordResult } from 'libs/api-interfaces/src/lib/WordResult';

@Controller('check')
export class WordCheckerController {
    wordCorrectness: WordResult
    constructor(private wordService: WordService) {

    }

    @Put() 
    checkWord(@Body() body: WordCheckDto): WordResult {
        return this.wordService.checkWord(body)
        
    }
}