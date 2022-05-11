// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Correctness } from 'libs/api-interfaces/src/lib/WordResult';
import { Component } from '@angular/core';

@Component({
    selector: "wordle-workspace-keyboard",
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
    styles = Array(26).fill("");

    keyPress(str: string) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: str,
            code: `Key${str}`,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        }));
    }

    enterPress() {
        document.dispatchEvent(new KeyboardEvent('keypress', {
            key: "Enter",
            code: "Enter",
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        }));
    }

    backspace() {
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: "Backspace",
            code: "Backspace",
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        }));
    }

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
    }

    clear() {
        this.styles = Array(26).fill("");
    }
}