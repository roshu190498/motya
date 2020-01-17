import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../loan.service';
import { LoanRatesService } from '../../loan_rates/loan_rates.service';
import { ApprovedLoanService } from '../../approvedLoan/approvedLoan.service';
import { LoanTypeService } from 'src/app/loan_type/loan_type.service';
import { LoanStatusService } from 'src/app/loan_status/loan_status.service';

@Component({
    selector: 'app-loan-update',
    templateUrl: './loan.update.component.html',
    styleUrls : ['./loan.update.component.css']
})

export class LoanUpdateComponent implements OnInit {
    types = []
    status = []
    rates = []
    
    loan_amount = 0
    emi_amount
    emiNo = 0
    rate_id = 0
    type_id = 0
    acc_balance = 0
    status_id = 0
    acc_no=0
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private approvedLoanService : ApprovedLoanService,
        private typeService : LoanTypeService,
        private rateService : LoanRatesService,
        private loanService : LoanService,
        private statusService : LoanStatusService) { 

        this.acc_no=this.route.snapshot.params['acc_no']
        if(this.acc_no){
                this.loanService.getAccountDetail(this.acc_no)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log(response['data'])
                        const loan=response['data']
                        this.loan_amount = loan[0].loan_amount
                        this.type_id=loan[0].type_id
                        this.status_id =loan[0].status_id 
                    }else{
                        console.log(response['error'])
                    }
                })
            }
     
        this.typeService.get().subscribe(response => {
            if(response['status'] == 'success')
            {
            this.types = response['data']
            // this.type_id = this.types[0].type_id
            } else {
            console.log(response['error'])
            }
         })

        this.statusService.get().subscribe(response => {
            if(response['status'] == 'success')
            {
            this.status = response['data']
            // this.status_id = this.status[0].status_id
            } else {
            console.log(response['error'])
            }
        })

        this.rateService.get().subscribe(response => {
            if(response['status'] == 'success')
            {
            this.rates = response['data']
            this.rate_id = this.rates[0].interest_rate
            } else {
            console.log(response['error'])
            }
        })
        }
approvedLoan()
{
    this.approvedLoanService.addLoanAccount(this.acc_no, this.loan_amount, this.type_id, this.status_id,  this.rate_id,  this.emiNo, this.emi_amount)
    .subscribe(response=>{
        if(response['status']=='success')
        {
            alert('Approved Loan Succesfully..!')
            this.router.navigate(['/loan-list'])
        }else{
            console.log(response['error'])
        }
    })
}
onCancel()
{
    this.router.navigate(['/loan-list'])
}
    ngOnInit() { }
}