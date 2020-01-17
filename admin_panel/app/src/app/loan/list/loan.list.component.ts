import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loan-list',
    templateUrl: './loan.list.component.html',
    styleUrls: ['./loan.list.component.css']
})

export class LoanListComponent implements OnInit {
    loans : any[]

    constructor(private service : LoanService,
        private router : Router) { 
        this.getLoans()
    }

    getLoans(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.loans = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() { }

    onDelete(loan_id : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteAccount(loan_id).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted Loan Account')
                    this.getLoans()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }

    onApprove(acc_no) {
        this.router.navigate([`/loan-update/${acc_no}`])
    }
}