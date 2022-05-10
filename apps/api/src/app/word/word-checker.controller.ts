/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WordService } from './word.service';
import { WordCheckDto } from '../../../../../libs/api-interfaces/src/lib/word.dto';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { WordResult } from 'libs/api-interfaces/src/lib/WordResult';

@Controller()
export class WordCheckerController {
    wordCorrectness: WordResult
    constructor(private wordService: WordService) {

    }

    @Put('check')  //api/check put
    async checkWord(@Body() body: WordCheckDto): Promise<WordResult> {
         return await this.wordService.checkWord(body);
    }

    @Post('newgame')
    async newGame() {
        await this.wordService.makeNewSelectedWord();
    }
}