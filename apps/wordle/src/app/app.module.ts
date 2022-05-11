import { WinService } from './win.service';
import { WordService } from './word.service';
import { BoardComponent } from './board/board.component';
import { WordComponent } from './word/word.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent, 
    WordComponent,
    BoardComponent,
    KeyboardComponent],

  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [WordService, WinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
