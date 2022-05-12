import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:"root",
})
export class IdService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    constructor(private http: HttpClient) {}

    /**
     * Creates a new user id with an associated selected word.
     * 
     * @returns the user id.
     */
    createNewId(): Observable<string> {
        return this.http.put<string>('api/id', "", this.httpOptions);
    }
}