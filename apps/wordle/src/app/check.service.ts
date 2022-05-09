import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CheckService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    url = 'api/check'
    constructor(private http: HttpClient) {}

    checkWord(wordGuess: string): Observable<string> {
        return this.http.get<string>(this.url);
    }
}