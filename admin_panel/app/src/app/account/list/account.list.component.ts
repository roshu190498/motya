import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { AccTypeService } from 'src/app/acc_type/acc_type.service';

@Component({
    selector: 'app-account-list',
    templateUrl: './account.list.component.html',
    styleUrls: ['./account.list.component.css']
})

export class AccountListComponent implements OnInit {
    accounts : any[]
    types : any[]

    constructor(private service : AccountService,
        private typeService : AccTypeService,
        private router : Router) {
            
        this.typeService.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.types = response['data']
            } else {
                console.log(response['error'])
            }
        })

        this.getAccounts()
    }

    getAccounts(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.accounts = response['data']
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
                    alert('Deleted account')
                    this.getAccounts()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }

    onAddAccount() {
        this.router.navigate(['/account-add'])
    }

    onLogOut(){
        sessionStorage.removeItem('login_status')
    }
}