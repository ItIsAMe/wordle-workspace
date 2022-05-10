// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Correctness } from './../../../../../libs/api-interfaces/src/lib/WordResult';

import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'wordle-workspace-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent{

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
    }

    onInput(event: any) {
      let element;
      if (event.code === 'Backspace')
        element = event.srcElement.previousElementSibling;
      else if ((<string>event.code).includes("Key"))
        element = event.srcElement.nextElementSibling;

      if (element == null) {
        return;
      }
      else {
        element.focus();
      }
    }
}
