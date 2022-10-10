import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileTreeService {
    private JSON_URL = 'assets/tree.json';
    constructor(private httpClient: HttpClient) {}

    getFileTree(): Observable<any> {
        return this.httpClient.get(this.JSON_URL);
    }
}