import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class CurrentWordService {
    
    isValid(chars: string[]): boolean {
        for(let i = 0; i < chars.length; i ++) {
            if (chars[i].length != 1) {
                return false;
            }
            else if (!chars[i].match(/[a-zA-Z]/g)){
                return false;
            }
        }
        return true;
    }
}