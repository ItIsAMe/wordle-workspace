import { Component } from '@angular/core';

@Component({
    selector: "wordle-workspace-keyboard",
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
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
}