import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {

    url = 'http://localhost:4000/acc_holder'

    constructor(private http : HttpClient) { }

    get(){
      return this.http.get(this.url);
    }

    getAccountDetail(acc_no: string) {
      return this.http.get(this.url + '/details/' + acc_no)
  }

    updateAccount(name : string, email : string, address : string ,mob_no : string , activate_status : number , acc_no : string)
    {
        const body={
            name : name,
            address : address,
            mob_no : mob_no,
            email : email,
            activate_status : activate_status    
        }
            return this.http.put(this.url+'/'+acc_no,body)
    }

    toggle(toggle_status : number , acc_no : number)
    {
      console.log("madarchod")
        const body={
            toggle_status : toggle_status    
        }
        return this.http.put(this.url+'/toggle/'+acc_no,body)
    }

    registerCustomer(name : string, address : string, mob_no : number, email : string, password : string, open_bal : number){

        const body = {
            name : name,
            address : address,
            open_bal : open_bal,
            mob_no : mob_no,
            email : email,
            password : password
        }

        return this.http.post(this.url + '/register', body)
    }

    login(email: string, password: string) {
        const body = {
          email: email,
          password: password
        }
    
        return this.http.post(this.url + '/login', body)
      }
 
    deleteAccHolder(acc_no : number){
        return this.http.delete(this.url + '/' + acc_no)
      }
    
    getAccHolderDetail(email: string) {
        return this.http.get(this.url + '/' + email)
    }

    withdraw(acc_no : number, acc_bal : number, amount : number){
        const body = {
          acc_bal : acc_bal,
          amount : amount
        }

        return this.http.put(this.url + '/withdraw/' + acc_no, body)    
    }

    deposit(acc_no : number, acc_bal : number, amount : number){
      const body = {
        acc_bal : acc_bal,
        amount : amount
      }

      return this.http.put(this.url + '/deposit/' + acc_no, body)    
    }

    fundTransfer(acc_no : number,benAccNo : number, amount : number){
      const body = {
        benAccNo : benAccNo,
        amount : amount
      }
      console.log(body);
      
      return this.http.put(this.url + '/fundTransfer/' + acc_no, body)    
    }
}