import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRatesService } from '../../loan_rates/loan_rates.service';
import { ApprovedLoanService } from '../../approvedLoan/approvedLoan.service';
import { LoanStatusService } from 'src/app/loan_status/loan_status.service';

@Component({
    selector: 'app-approvedLoan-update',
    templateUrl: './approvedLoan.update.component.html',
    styleUrls : ['./approvedLoan.update.component.css']
})

export class ApprovedLoanUpdateComponent implements OnInit {
    status = []
    rates = []
    
    loan_amount = 0
    emi_amount = 0
    emiNo = 0
    rate_id = 0
    status_id = 0
    acc_no=0
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private approvedLoanService : ApprovedLoanService,
        private rateService : LoanRatesService,
        private loanService : ApprovedLoanService,
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
                        this.emi_amount = loan[0].EMI_amount
                        this.emiNo = loan[0].no_of_EMI
                        this.rate_id = loan[0].interest_rate
                        this.status_id =loan[0].status_id 
                    }else{
                        console.log(response['error'])
                    }
                })
            }

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
onUpdateLoan()
{
    this.approvedLoanService.updateAccount(this.acc_no, this.loan_amount, this.rate_id, this.status_id, this.emiNo, this.emi_amount)
    .subscribe(response=>{
        if(response['status']=='success')
        {
            alert('Updated Loan Succesfully..!')
            this.router.navigate(['/approvedLoan-list'])
        }else{
            console.log(response['error'])
        }
    })
}
onCancel()
{
    this.router.navigate(['/approvedLoan-list'])
}
    ngOnInit() { }
}