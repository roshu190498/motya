import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransTypeService {
    url = 'http://localhost:4000/trans_type'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

}