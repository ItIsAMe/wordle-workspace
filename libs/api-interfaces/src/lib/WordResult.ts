export class WordResult {
    results: Correctness[];

    constructor(arr: Correctness[]) {
        this.results = arr;
    }
}

export enum Correctness {
    Correct,
    Wrong,
    Partial
}
