import { IdService } from './../id.service';
import { KeyboardComponent } from './../keyboard/keyboard.component';
import { WinService } from './../win.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WordCheckDto } from 'libs/api-interfaces/src/lib/word.dto';
import { WordComponent } from './../word/word.component';
import { Component, HostListener, QueryList, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { WordService } from '../word.service';
import Swal from 'sweetalert2';
import{ CookieService } from 'ngx-cookie-service';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'wordle-workspace-board',
  templateUrl:'./board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{

  currentInd = 0;
  inProgress = true;
  endMessage = "";
  private userId = "";
  @ViewChildren('word') components?: QueryList<WordComponent>;
  @ViewChild('keyboard') keyboard?: KeyboardComponent;
  @ViewChild('canvas') canvas: any;
  myConfetti: any;

  constructor(private wordService: WordService, private winService: WinService, private cookieService: CookieService, private idService: IdService) {}

  ngOnInit() {
    this.loadCookieData();
    this.myConfetti = confetti.create(this.canvas,{
      resize: true
    });
    
  }
  
  /**
   * Checks and validates a word. Then outputs the resulting 
   * comparision of the inputted word and the real word.
   */
  check(): void {
    if (typeof this.components ==='undefined') {
      return;
    }
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
        if (this.keyboard)
          this.keyboard.updateStyle(result.results, wordGuess);
          
        this.currentInd++;
        const won = this.winService.checkWin(result);
        if (won) {
          console.log(won);
          this.confettiSuprise();
          this.endMessage = "You got the wordle";
          this.setGameDoneState();
        }
        else if (this.currentInd > 5) {
          this.endMessage = "Better luck next time";
          this.setGameDoneState();
        }
        this.setCookieData();
      }
      else {
        this.invalidWordPopup();
      }
    });
  }

  /**
   * Updates the current real word, to be a different word.
   */
  newWord(): void {
    if (typeof this.components ==='undefined') {
      return;
    }
    else {
      const components = this.components.toArray();
      for(let i = 0; i< components.length; i++) {
        components[i].clear();
      }
    }

    if(this.keyboard) {
      this.keyboard.clear();
    }
    
    this.wordService.newGame().subscribe(()=>{
      this.setGameStartState();
      this.setCookieData();
    });
  }

  /**
   * Determines if the enter key was pressed and checks the word.
   * @param event, Key press event
   */
  @HostListener('document:keypress', ['$event'])
  potentiallyCheck(event: KeyboardEvent) {
    if (event.code ==="Enter" && this.inProgress) {
      this.check();
    }
  }

  /**
   * Creates a pop up to show an invalid word is entered.
   */
  private invalidWordPopup() {
    Swal.fire({
      position: 'top',
      width: 300,
      title: 'Not a valid word',
      showConfirmButton: false,
      timer: 700,
    });
  }

  /**
   * Sets board state to done state.
   */
  private setGameDoneState() {
    this.currentInd = 6;
    this.inProgress = false;
  }

  /**
   * Sets board state to start state.
   */
  private setGameStartState() {
    this.currentInd = 0;
    this.inProgress = true;
  }

  /**
   * Saves board data to browser cookies.
   */
  private loadCookieData() {
    if (!this.cookieService.check('id')){
      this.idService.createNewId().subscribe((id) => {
        this.userId = id;
        this.cookieService.set('id', id);
      });
    }
    this.userId = this.cookieService.get('id');
    this.currentInd = (this.cookieService.check('currentInd'))? +this.cookieService.get('currentInd'): 0;
    this.inProgress = (this.cookieService.check('inProgress'))? this.cookieService.get('inProgress')==="true": true;
    this.endMessage = (this.cookieService.check('endMessage'))? this.cookieService.get('endMessage'): "";
    console.log(this.endMessage);
  }

  /**
   * loads board data from browser cookies.
   */
  private setCookieData() {
    this.cookieService.set('currentInd', this.currentInd.toString());
    this.cookieService.set('inProgress', this.inProgress.toString());
    this.cookieService.set('endMessage', this.endMessage);
  }

  private confettiSuprise(): void {
    this.myConfetti();
  }
}