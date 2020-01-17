import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';
import { AccountService } from '../../account/account.service';
import { TransService } from 'src/app/transaction/transaction.service';

@Component({
    selector: 'app-customer-deposit',
    templateUrl: './customer.deposit.component.html',
    styleUrls: ['./customer.deposit.component.css']
})

export class CustomerDepositComponent implements OnInit {

    withdrawAmount = 0
    email = ''
    acc_no = 0
    acc_bal = 0
    amount = 0
    
    constructor(private router : Router,
        private route : ActivatedRoute,
        private transService: TransService,
        private service:CustomerService,
        private accService: AccountService,
        ) { 
            this.email = this.route.snapshot.params['email']
            if(this.email){
                this.service.getAccHolderDetail(this.email)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log(response['data'])
                        const holders = response['data']
                        this.acc_no = holders[0].acc_no
                        this.acc_bal = holders[0].acc_bal          
                    }else{
                        console.log(response['error'])
                    }
                })
            }
        }

    onDeposit(){
        this.service.deposit(this.acc_no, this.acc_bal, this.amount)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                console.log("Success")      
            }else{
                console.log(response['error'])
            }
        })

        this.transService
        .addTransaction(this.acc_no, 1, this.amount)
        .subscribe(response => {
          if (response['status'] == 'success') {
            console.log("Success")    
          } else {
            console.log(response['error'])
          }
        })

        this.accService.depositBal(this.acc_no, this.acc_bal, this.amount)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                
                this.router.navigate([`/customer-details/${this.email}`])
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