import { CurrentWordService } from '../word.service';
import { WordComponent } from './../word/word.component';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CheckService } from '../check.service';

@Component({
  selector: 'wordle-workspace-board',
  templateUrl:'./board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit{
  currentInd = 0;

  constructor(private checkService: CheckService, private currentWordService: CurrentWordService) {}
  
  @ViewChildren('word') components?: QueryList<WordComponent>;

  ngAfterViewInit(){
    console.log(this.components);
  }

  test() {
    if (typeof this.components ==='undefined') {
      return;
    }
    else {
      const wordGuess = this.components.toArray()[this.currentInd].chars;
      if (!this.currentWordService.isValid(wordGuess)){
        console.log("not valid");
        return;
      }
      console.log(wordGuess);
      this.checkService.checkWord(wordGuess.toString()).subscribe((str) => {
        console.log(str);
        this.currentInd++;
      });
      //if all letters entered
        //service call to api
        //if not valid word from api give meesage
        //else valid return result and incr currentInd
    }
  }
}