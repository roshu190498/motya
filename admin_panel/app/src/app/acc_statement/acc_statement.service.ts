import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccStatementService {
    url = 'http://localhost:4000/acc_statement'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

    deleteAccount(acc_no : number){
        return this.http.delete(this.url + '/' + acc_no)
      }

    addAccount(sr_no : number, acc_no : number,acc_holder_name : string, type_id :number, acc_balance : number, acc_open_date : string, status_id : number, loan_type : number){
        const body = {
            sr_no : sr_no,
            acc_no : acc_no,
            acc_holder_name : acc_holder_name,
            type_id : type_id,
            acc_balance : acc_balance,
            acc_open_date : acc_open_date,
            status_id : status_id,
            loan_type : loan_type
        }
        
        return this.http.post(this.url, body)
    }

}