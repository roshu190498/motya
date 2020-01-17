import { Component, OnInit } from '@angular/core';
import { AccStatementService } from '../acc_statement.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-acc_statement-list',
    templateUrl: './acc_statement.list.component.html',
    styleUrls: ['./acc_statement.list.component.css']
})

export class AccStatementComponent implements OnInit {
    entries : any[]

    constructor(private service : AccStatementService,
        private router : Router) { 
        this.getAccStmnts()
    }

    getAccStmnts(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.entries = response['data']
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
                    alert('Deleted statement entry')
                    this.getAccStmnts()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }

    onAddAccount() {
        this.router.navigate(['/acc_statement-add'])
    }
}