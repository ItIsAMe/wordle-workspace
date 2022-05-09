import { Injectable } from '@nestjs/common';
import { Correctness, WordResult } from 'libs/api-interfaces/src/lib/WordResult';
import { WordCheckDto } from '../../../../../libs/api-interfaces/src/lib/word.dto';

@Injectable()
export class WordService {

    checkWord(word: WordCheckDto): WordResult {
        return new WordResult(
            [Correctness.Correct,
            Correctness.Partial,
            Correctness.Wrong,
            Correctness.Wrong,
            Correctness.Correct]);
         
    }
}