/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { WordCheckDto } from './../../../../../libs/api-interfaces/src/lib/word.dto';
import { WordComponent } from './../word/word.component';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { WordService } from '../word.service';
import { Correctness, WordResult } from 'libs/api-interfaces/src/lib/WordResult';

@Component({
  selector: 'wordle-workspace-board',
  templateUrl:'./board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent{
  currentInd = 0;
  inProgress = true;
  won = false;
  constructor(private wordService: WordService) {}
  
  @ViewChildren('word') components?: QueryList<WordComponent>;

  check() {
    if (typeof this.components ==='undefined') {
      return;
    }
    else {
      const component = this.components.toArray()[this.currentInd];
      const wordGuess = component.chars;
      if (!this.wordService.isValid(wordGuess)){
        console.log("not valid");
        return;
      }
      const wordCheckDto = new WordCheckDto(wordGuess);
      this.wordService.checkWord(wordCheckDto).subscribe((result) => {
        console.log(result);
        if (result.valid){
          component.updateStyle(result.results);
          this.currentInd++;
          this.checkWin(result);
        }
        else {
          console.log("not valid word");
        }
      });
    }
  }
  
  checkWin(result: WordResult) {
    this.won = true;
    for(let i = 0; i < result.results.length; i++) {
      if (result.results[i] != Correctness.Correct) {
        this.won = false;
      }
    }
    if (this.currentInd > 5 || this.won) {
      this.currentInd = 6;
      this.inProgress = false;
    }
  }
  newWord() {
    if (typeof this.components ==='undefined') {
      return;
    }
    else {

      const components = this.components.toArray();
      for(let i = 0; i< components.length; i++) {
        components[i].clear();
      }
    }
    this.currentInd = 0;
    this.wordService.newGame().subscribe();
    this.inProgress = true;
  }
}