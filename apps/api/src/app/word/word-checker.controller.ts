/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WordService } from './word.service';
import { WordCheckDto } from '../../../../../libs/api-interfaces/src/lib/word.dto';
import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { WordResult } from 'libs/api-interfaces/src/lib/WordResult';

@Controller()
export class WordCheckerController {
    wordCorrectness: WordResult
    constructor(private wordService: WordService) {

    }


    /**
     * Checks the correctness of a inputted word, against the
     * users specific real word.
     *
     * @param userId, user asking for the word check.
     * @param body, WordCheckDto that contains the letters of the inputted word.
     * @returns
     */
    @Put('check/:id')  //api/check put
    async checkWord(@Param('id') userId: string, @Body() body: WordCheckDto): Promise<WordResult> {
         return await this.wordService.checkWord(body, userId);
    }

    /**
     * Updates a user specific real word to a random new one.
     *
     * @param userId, the user asking for the new game
     * @returns
     */
    @Put('newgame/:id')
    async newGame(@Param('id') userId: string) {
        await this.wordService.updateSelectedWord(userId);
        return true;
    }

  /**
   * Gets a users word they are guessing.
   *
   * @param userId, the user asking for the new game
   * @returns
   */
  @Get('getWord/:id')
  async getWord(@Param('id') userId: string) {
    return await this.wordService.getWord(userId);
  }
}
