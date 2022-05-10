// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Correctness } from './../../../../../libs/api-interfaces/src/lib/WordResult';

import { Component, HostListener, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'wordle-workspace-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent{
    charsInd = -1;
    chars= ['', '', '', '', ''];
    correctness = ['','','','',''];
    @Input() current = false;

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
    }

    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    clear() {
      this.updateStyle([Correctness.Wrong, Correctness.Wrong, Correctness.Wrong, Correctness.Wrong, Correctness.Wrong]);
      this.chars= ['', '', '', '', ''];
      this.charsInd = -1;
    }

    @HostListener('document:keydown', ['$event'])
    onInput(event: KeyboardEvent) {
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
}
