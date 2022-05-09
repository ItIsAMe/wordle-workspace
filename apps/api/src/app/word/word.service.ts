/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { Correctness, WordResult } from 'libs/api-interfaces/src/lib/WordResult';
import { WordCheckDto } from 'libs/api-interfaces/src/lib/word.dto';

@Injectable()
export class WordService {

    checkWord(word: WordCheckDto): WordResult {
        // get word of the day
        //compareTo given word
        // return resulting 
        return this.getResult(word.chars, "there")
         
    }

    getResult(chars: string[], realWord: string): WordResult {
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
                    mapLetters.set(chars[k], freq);
                    correctnessArr[k] = Correctness.Partial;
                }
            }
        }
        return new WordResult(correctnessArr);
    }
}