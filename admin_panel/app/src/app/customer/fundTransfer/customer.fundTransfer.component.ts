import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
    selector: 'app-customer-fundTransfer',
    templateUrl: 'customer.fundTransfer.component.html',
    styleUrls: ['./customer.fundTransfer.component.css']
})

export class CustomerFundTransferComponent implements OnInit {
    withdrawAmount = 0
    email = ''
    acc_no = 0
    acc_bal = 0
    benficiaryAccNo = 0
    benificiaryAccHolderName = ''
    amount = 0
    
    constructor(private router : Router,
        private route : ActivatedRoute,
        private service:CustomerService,
        private accService: AccountService,) { 
                this.email = this.route.snapshot.params['email']
        
                this.service.getAccHolderDetail(this.email)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log("..................."+response['data'])
                        const holders = response['data']
                        this.acc_no = holders[0].acc_no
                        this.acc_bal = holders[0].acc_bal          
                    }else{
                        console.log(response['error'])
                    }
                })
     }

    onTransfer(){

        this.service.withdraw(this.acc_no, this.acc_bal, this.amount)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                console.log("Success")      
            }else{
                console.log(response['error'])
            }
        })


        this.service.fundTransfer(this.acc_no, this.benficiaryAccNo, this.amount)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                console.log("Success") 
            }else{
                console.log(response['error'])
            }
        })
        
        this.accService.withdrawBal(this.acc_no, this.acc_bal, this.amount)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                console.log("Success") 
            }else{
                console.log(response['error'])
            }
        })

        this.accService.fundTransferBal(this.acc_no, this.benficiaryAccNo, this.benificiaryAccHolderName, this.amount)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                console.log("Success") 
            }else{
                console.log(response['error'])
            }
        })
    }

    onCancel(){
        this.router.navigate([`/customer-details/${this.email}`])
        }

    ngOnInit() { }
}