import { Component, OnInit } from '@angular/core';
import { LoanTypeService } from '../loan_type.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loan_type-list',
    templateUrl: './loan_type.list.component.html',
    styleUrls: ['./loan_type.list.component.css']
})

export class LoanTypeListComponent implements OnInit {
    loan_types : any[]

    constructor(private service : LoanTypeService,
        private router : Router) { 
        this.getLoanTypes()
    }

    getLoanTypes(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.loan_types = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() { }

    onDelete(type_id : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteAccType(type_id).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted loan type')
                    this.getLoanTypes()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }
}