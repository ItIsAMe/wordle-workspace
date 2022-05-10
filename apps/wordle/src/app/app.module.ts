import { WordService } from './word.service';
import { BoardComponent } from './board/board.component';
import { WordComponent } from './word/word.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    WordComponent,
    BoardComponent],

  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [WordService],
  bootstrap: [AppComponent],
})
export class AppModule {}
