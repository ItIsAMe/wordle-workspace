import { WinService } from './../win.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WordCheckDto } from 'libs/api-interfaces/src/lib/word.dto';
import { WordComponent } from './../word/word.component';
import { Component, HostListener, QueryList, ViewChildren } from '@angular/core';
import { WordService } from '../word.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'wordle-workspace-board',
  templateUrl:'./board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent{
  currentInd = 0;
  inProgress = true;
  won = false;
  endMessage = "";
  constructor(private wordService: WordService, private winService: WinService) {}
  
  @ViewChildren('word') components?: QueryList<WordComponent>;

  check() {
    if (typeof this.components ==='undefined') {
      return;
    }
    else {
      const component = this.components.toArray()[this.currentInd];
      const wordGuess = component.chars;
      if (!this.wordService.isValid(wordGuess)){
        this.invalidWordPopup();
        return;
      }
      const wordCheckDto = new WordCheckDto(wordGuess);
      this.wordService.checkWord(wordCheckDto).subscribe((result) => {
        if (result.valid){
          component.updateStyle(result.results);
          this.currentInd++;

          const won = this.winService.checkWin(result);
          if (won) {
            this.endMessage = "You got the wordle";
            this.setGameDoneState(this.won);
          }
          else if (this.currentInd > 5) {
            this.endMessage = "Better luck next time";
            this.setGameDoneState(this.won);
          }
        }
        else {
          this.invalidWordPopup();
        }
      });
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
    this.wordService.newGame().subscribe(()=>{
      this.setGameStartState();
    });
  }

  @HostListener('document:keypress', ['$event'])
  potentiallyCheck(event: KeyboardEvent) {
    if (event.code ==="Enter" && this.inProgress) {
      this.check();
    }
  }

  private invalidWordPopup() {
    Swal.fire({
      position: 'top',
      width: 300,
      title: 'Not a valid word',
      showConfirmButton: false,
      timer: 1000,
      
    });
  }

  private setGameDoneState(won: boolean) {
    this.currentInd = 6;
    this.inProgress = false;
  }

  private setGameStartState() {
    this.currentInd = 0;
    this.inProgress = true;
  }
}