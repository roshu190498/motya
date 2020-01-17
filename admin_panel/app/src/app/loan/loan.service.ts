import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoanService {


    url = 'http://localhost:4000/loan'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }


    
    deleteAccount(loan_id : number){
        return this.http.delete(this.url + '/' + loan_id)
      }

    addLoanAccount(acc_no : number, loan_amount : number, type_id :number, status_id : number){
        const body = {
            acc_no : acc_no,
           
            loan_amount : loan_amount,
            type_id : type_id,
            status_id : status_id
        }
        
        return this.http.post(this.url, body)
    }

        getAccountDetail(acc_no: number) {
            return this.http.get(this.url+'/'+acc_no)
    }

}