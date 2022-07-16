import { Word } from './word.entity';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { Correctness, WordResult } from 'libs/api-interfaces/src/lib/WordResult';
import { WordCheckDto } from 'libs/api-interfaces/src/lib/word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectedWord } from './selected-word.entity';

@Injectable()
export class WordService {

    constructor(
        @InjectRepository(Word)
        private wordRepository: Repository<Word>,
        @InjectRepository(SelectedWord)
        private selectedWordRepository: Repository<SelectedWord>,
    )
    {}

    /**
     * Checks the word agains the real word.
     *
     * @param wordInputted, the word inputted.
     * @param userId, the specific.
     * @returns the correctness of each letter
     */
    async checkWord(wordInputted: WordCheckDto, userId: string): Promise<WordResult> {

        //Determine if the inputted word is found in the repo word
        //to make sure it is an actual word.
        const wordFound = await Word.findOne({
            where: {
                str:`${wordInputted.chars.join("")}`,
            }
        })
        //Not a word return invalid word response.
        if (wordFound === null) {
            return new WordResult([Correctness.Correct], false);
        }

        //Get the real word of the specific user from the SelectedWord repository.
        const realWord = await SelectedWord.findOne({
            where: {
                userId: userId,
            },
            relations: ['word'],
        });
        console.log(realWord.word.str);

        return this.getResult(wordInputted.chars.join("").toLowerCase(), realWord.word.str);
    }

    /**
     * Algorithim that checks the correctness of an inputted word agains the real word
     *
     * @param chars, the inputted word.
     * @param realWord, the real word of the specific user.
     * @returns the correctness of each letter in the inputted word.
     */
    getResult(chars: string, realWord: string): WordResult {
        const mapLetters = new Map<string, number> ();
        for(let i = 0; i < realWord.length; i++) {
            const freq = mapLetters.get(realWord.charAt(i));
                if (freq === undefined) {
                    mapLetters.set(realWord.charAt(i), 1);
                }
                else {
                    mapLetters.set(realWord.charAt(i), freq+1);
                }
        }

        const correctnessArr = new Array<Correctness>();
        for (let j = 0; j < chars.length; j++) {
            if (chars[j] === realWord.charAt(j)) {
                correctnessArr[j] = Correctness.Correct;

                const freq = mapLetters.get(chars[j]);
                mapLetters.set(chars[j], freq-1);
            }
        }

        for(let k = 0; k < chars.length; k ++) {
            if (correctnessArr[k] === Correctness.Correct) {
                //index already done as correct, no op
                continue;
            }

            if (!mapLetters.has(chars[k])) {
                correctnessArr[k] = Correctness.Wrong;
            }
            else {
                //string contains letter but need to make sure that
                //there is existing letter(s) that can be used
                const freq = mapLetters.get(chars[k]);
                if (freq == 0) {
                    correctnessArr[k] = Correctness.Wrong;
                }
                else {
                    mapLetters.set(chars[k], freq-1);
                    correctnessArr[k] = Correctness.Partial;
                }
            }
        }
        return new WordResult(correctnessArr, true);
    }

    /**
     * Updates the selected word of a specific user to a random new one.
     * @param userId, user that specified the action.
     */
    async updateSelectedWord(userId: string) {
        const randId = Math.floor(Math.random() * 5757);
        await this.selectedWordRepository.save({
            userId: userId,
            wordId:randId,
        });
    }

  /**
   * gets a users word they are guessing
   * @param userId the specific user
   * @Return string the user's word they are guessing
   */
  async getWord(userId: string): Promise<string> {
      const realWord = await SelectedWord.findOne({
        where: {
          userId: userId,
        },
        relations: ['word'],
      });
      return JSON.stringify(realWord.word.str);
    }
}
