import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoanRatesService {
    url = 'http://localhost:4000/loan_rates'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

}