import { Component, OnInit } from '@angular/core';
import { TransService } from '../transaction.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction.list.component.html',
    styleUrls: ['./transaction.list.component.css']
})

export class TransactionListComponent implements OnInit {
    transactions : any[]

    constructor(private service : TransService,
        private router : Router) { 
        this.getTransactions()
    }

    getTransactions(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.transactions = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() { }

    onDelete(trans_id : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteTransaction(trans_id).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted transaction')
                    this.getTransactions()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }

    onAddTransaction() {
        this.router.navigate(['/transaction-add'])
    }
}