import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovedLoanService } from '../approvedLoan.service';

@Component({
    selector: 'app-approvedLoan-list',
    templateUrl: './approvedLoan.list.component.html',
    styleUrls: ['./approvedLoan.list.component.css']
})

export class ApprovedLoanListComponent implements OnInit {
    loans : any[]

    constructor(private service : ApprovedLoanService,
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

    onDelete(acc_no : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteAccount(acc_no).subscribe(response => {
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

    onUpdate(acc_no : number) {
        this.router.navigate([`/approvedLoan-update/${acc_no}`])
    }
}