
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WordCheckDto } from './../../../../../libs/api-interfaces/src/lib/word.dto';
import { WordComponent } from './../word/word.component';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'wordle-workspace-board',
  templateUrl:'./board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent{
  currentInd = 0;

  constructor(private wordService: WordService) {}
  
  @ViewChildren('word') components?: QueryList<WordComponent>;

  test() {
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
      console.log(wordGuess);
      const wordCheckDto = new WordCheckDto(wordGuess);
      this.wordService.checkWord(wordCheckDto).subscribe((result) => {
        console.log(result);
        if (result.valid){
          component.updateStyle(result.results);
          this.currentInd++;
        }
        else {
          console.log("not valid word");
        }
      });
      //if all letters entered
        //service call to api
        //if not valid word from api give meesage
        //else valid return result and incr currentInd
    }
  }

  playAgain() {
    //clear components
    //
    this.wordService.newGame();
  }
}