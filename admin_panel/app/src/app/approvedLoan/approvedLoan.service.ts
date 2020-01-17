import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApprovedLoanService {
    url = 'http://localhost:4000/approvedLoan'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

    deleteAccount(acc_no : number){
        return this.http.delete(this.url + '/' + acc_no)
      }

    addLoanAccount(acc_no : number,loan_amount : number, type_id :number, status_id : number, interest_rate : number, no_of_EMI : number, EMI_amount : number){
        const body = {
            acc_no : acc_no,
            loan_amount : loan_amount,
            type_id : type_id,
            status_id : status_id,
            interest_rate : interest_rate,
            no_of_EMI : no_of_EMI,
            EMI_amount : EMI_amount 
        }
        
        return this.http.post(this.url, body)
    }

    getAccountDetail(acc_no: number) {
        return this.http.get(this.url+'/'+acc_no)
    }

    updateAccount(acc_no : number, loan_amount : number, interest_rate : number, status_id : number, no_of_EMI : number, EMI_amount : number)
    {
        const body={
            loan_amount : loan_amount,
            interest_rate : interest_rate,
            status_id : status_id,
            no_of_EMI : no_of_EMI,
            EMI_amount : EMI_amount    
        }
            return this.http.put(this.url+'/'+acc_no,body)
    }
}