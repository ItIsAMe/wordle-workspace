// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Correctness } from './../../../../../libs/api-interfaces/src/lib/WordResult';

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'wordle-workspace-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit{
  charsInd = -1;
  chars= ['', '', '', '', ''];
  correctness = ['','','','',''];
  @Input() current = false;
  @Input() componentId = "";

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getCookieData();
  }

  /**
  * Updates the inputted letters on the word using the 
  * result of its correctness
  * 
  * @param correctness, array of correctness where index respectively corresponds to the letters inputted
  */
  updateStyle(correctness: Correctness[]) {
    for(let i = 0; i < correctness.length; i++) {
      if (correctness[i] === Correctness.Correct) {
        this.correctness[i] = 'correct';
      }
      else if (correctness[i] === Correctness.Partial) {
        this.correctness[i] ='partial';
      }
      else {
        this.correctness[i] = '';
      }
    }
    this.setCookieData();
  }

  /**
   * Clears the style of the letters to be default style and empty. 
   */
  clear() {
    this.chars= ['', '', '', '', ''];
    this.charsInd = -1;
    this.updateStyle([Correctness.Wrong, Correctness.Wrong, Correctness.Wrong, Correctness.Wrong, Correctness.Wrong]);
  }

  /**
   * Listens for letter keydown events and enter keydown event
   * changing the inputted box at the same time.
   * 
   * @param event, the keydown event
   */
  @HostListener('document:keydown', ['$event'])
  onInput(event: KeyboardEvent): void {
    if (!this.current|| event.target && (<HTMLInputElement>event.target).nodeName === "BUTTON") {
      return;
    }
    if (event.code === 'Backspace' && this.charsInd >= 0){
      this.chars[this.charsInd] = "";
      this.charsInd--;
    }
    else if ((<string>event.code).includes("Key") && this.charsInd < 4) {
      this.charsInd++;
      this.chars[this.charsInd] = (<string>event.code).charAt(3);
    }
  }

  /**
   * Gets the word data from the browser cookies.
   */
  private getCookieData() {
    if (this.cookieService.check(`correctness${this.componentId}`)) {
      this.correctness = JSON.parse(this.cookieService.get(`correctness${this.componentId}`));
      this.chars = JSON.parse(this.cookieService.get(`chars${this.componentId}`));
      this.charsInd = JSON.parse(this.cookieService.get(`charsInd${this.componentId}`));
    }
  }

  /**
   * Sets the word data to the browser cookies.
   */
  private setCookieData() {
    this.cookieService.set(`correctness${this.componentId}`, JSON.stringify(this.correctness));
    this.cookieService.set(`chars${this.componentId}`, JSON.stringify(this.chars));
    this.cookieService.set(`charsInd${this.componentId}`, JSON.stringify(this.charsInd));
  }
}
