/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WordService } from './word.service';
import { WordCheckDto } from '../../../../../libs/api-interfaces/src/lib/word.dto';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { WordResult } from 'libs/api-interfaces/src/lib/WordResult';

@Controller()
export class WordCheckerController {
    wordCorrectness: WordResult
    constructor(private wordService: WordService) {

    }

    @Put('check/:id')  //api/check put
    async checkWord(@Param('id') userId: string, @Body() body: WordCheckDto): Promise<WordResult> {
         return await this.wordService.checkWord(body, userId);
    }

    @Put('newgame/:id')
    async newGame(@Param('id') userId: string, @Body() body: string) {
        await this.wordService.updateSelectedWord(userId);
        return true;
    }
}