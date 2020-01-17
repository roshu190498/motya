import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
    url = 'http://localhost:4000/account'

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

    getAccountDetail(acc_no: number) {
        return this.http.get(this.url+'/'+acc_no)
    }

    updateAccount(type_id : number, acc_balance : number, status_id : number, acc_no : number)
    {
        const body={
            type_id : type_id,
            acc_balance : acc_balance,
            status_id : status_id    
        }
            return this.http.put(this.url+'/'+acc_no,body)
    }

    withdrawBal(acc_no : number, acc_bal : number, amount : number){
        const body = {
          acc_bal : acc_bal,
          amount : amount
        }

        return this.http.put(this.url + '/withdrawBal/' + acc_no, body)    
    }

    depositBal(acc_no : number, acc_bal : number, amount : number){
        const body = {
          acc_bal : acc_bal,
          amount : amount
        }

        return this.http.put(this.url + '/depositBal/' + acc_no, body)    
    }

    fundTransferBal(acc_no : number, benificiaryAccNo : number, benificiaryAccHolderName : string, amount : number){
        const body = {
          benificiaryAccNo : benificiaryAccNo,
          benificiaryAccHolderName : benificiaryAccHolderName,
          amount : amount
        }

        return this.http.put(this.url + '/fundTransferBal/' + acc_no, body)    
    }
}