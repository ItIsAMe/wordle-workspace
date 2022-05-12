import { Injectable } from "@angular/core";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Correctness, WordResult } from "libs/api-interfaces/src/lib/WordResult";

@Injectable({
    providedIn: 'root'
})
export class WinService {

  /**
   * Determines if the player has guess the right word.
   * 
   * @param result, array of correctness
   * @returns true if the player has guess the right word otherwise false.
   */
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
