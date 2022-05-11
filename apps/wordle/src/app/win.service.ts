import { Injectable } from "@angular/core";
import { Correctness, WordResult } from "libs/api-interfaces/src/lib/WordResult";

@Injectable({
    providedIn: 'root'
})
export class WinService {
    checkWin(result: WordResult): boolean {
        let won = true;
        for(let i = 0; i < result.results.length; i++) {
          if (result.results[i] != Correctness.Correct) {
            won = false;
          }
        }
        return won;
      }
}
