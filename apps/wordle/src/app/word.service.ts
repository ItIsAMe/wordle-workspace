/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WordCheckDto } from '../../../../libs/api-interfaces/src/lib/word.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordResult } from '../../../../libs/api-interfaces/src/lib/WordResult';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class WordService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    constructor(private http: HttpClient, private cookieService: CookieService) {}

    /**
     * Check how correct each letter is, in the inputted word.
     * 
     * @param wordGuess, WordCheckDto with the guessed letters 
     * @returns the correctness of each letter
     */
    checkWord(wordGuess: WordCheckDto): Observable<WordResult> {
        return this.http.put<WordResult>(`api/check/${this.cookieService.get('id')}`, wordGuess, this.httpOptions);
    }

    /**
     * Updates the user selected Word.
     * @returns 
     */
    newGame(): Observable<boolean>{
        return this.http.put<boolean>(`api/newgame/${this.cookieService.get('id')}`,'', this.httpOptions);
    }
    
    /**
     * Determines if the inputted letters are all valid letters.
     * 
     * @param chars, inputted letters.
     * @returns true if the letters are all valid letters, otherwise false.
     */
    isValid(chars: string[]): boolean {
        for(let i = 0; i < chars.length; i ++) {
            if (chars[i].length != 1) {
                return false;
            }
            else if (!chars[i].match(/[a-zA-Z]/g)){
                return false;
            }
        }
        return true;
    }
}