export class WordResult {
    results: Correctness[];
    valid: boolean;
    constructor(arr: Correctness[], valid: boolean) {
        this.results = arr;
        this.valid = valid;
    }
}

export enum Correctness {
    Correct = "correct",
    Wrong = "none",
    Partial = "partial",
}
