import { CookieService } from 'ngx-cookie-service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Correctness } from 'libs/api-interfaces/src/lib/WordResult';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: "wordle-workspace-keyboard",
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit{
    styles = Array(26).fill("");

    constructor(private cookieService: CookieService) {}

    ngOnInit(): void {
        this.getCookieData();
    }

    /**
     * Dispatches a keydown event with the specified letter
     * determined by the button clicked.
     * 
     * @param str, the letter that needs to have a keydown dispatched
     */
    keyPress(str: string) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: str,
            code: `Key${str}`,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        }));
    }

    /**
     * Dispatches an Enter keydown event.
     */
    enterPress() {
        document.dispatchEvent(new KeyboardEvent('keypress', {
            key: "Enter",
            code: "Enter",
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        }));
    }

    /**
     * Dispatches a backspace keydown event.
     */
    backspace() {
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: "Backspace",
            code: "Backspace",
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        }));
    }

    /**
     * Updates the keyboard style based on the letter key used and its associated
     * correctness.
     * 
     * @param result, array of correctness
     * @param wordGuess, array of letters inputted
     */
    updateStyle(result: Correctness[], wordGuess: string[]) {
        for (let i = 0; i < result.length; i++) {
            const charInd = wordGuess[i].charCodeAt(0) - "A".charCodeAt(0);
            const classStyle = result[i];

            //no style yet
            if (this.styles[charInd] === "") {
                this.styles[charInd] = classStyle.toString();
            }
            else if (this.styles[charInd] === Correctness.Correct || this.styles[charInd] === Correctness.Wrong) {
                //noop
            }
            else if (this.styles[charInd] === Correctness.Partial) {
                if (classStyle === Correctness.Correct)
                    this.styles[charInd] = classStyle.toString();
            }
        }
        this.setCookieData();
    }

    /**
     * Clears style of the keyboard.
     */
    clear() {
        this.styles = Array(26).fill("");
        this.setCookieData();
    }

    /**
     * Gets keyboard data from the browser cookies.
     */
    private getCookieData() {
        if (this.cookieService.check('keyboardStyles')){
            this.styles = JSON.parse(this.cookieService.get('keyboardStyles'));
        }
    }

    /**
     * Sets keyboard data from the browser cookies.
     */
    private setCookieData() {
        this.cookieService.set('keyboardStyles', JSON.stringify(this.styles));
    }
}