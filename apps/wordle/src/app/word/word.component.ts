import { CurrentWordService } from '../word.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wordle-workspace-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent{
    chars= ['', '', '', '', ''];

    @Input() current = false;

}
