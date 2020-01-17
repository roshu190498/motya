import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransService {
    url = 'http://localhost:4000/transaction'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

    deleteTransaction(trans_id : number){
        return this.http.delete(this.url + '/' + trans_id)
      }

    addTransaction(acc_no : number, trans_type : number, trans_amount : number){
        const body = {
            acc_no : acc_no,
            trans_type : trans_type,
            trans_amount : trans_amount
        }
        
        return this.http.post(this.url, body)
    }
}