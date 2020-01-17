import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer.list.component.html',
    styleUrls: ['./customer.list.component.css']
})

export class CustomerListComponent implements OnInit {
    holders : any[]

    constructor(private service : CustomerService,
        private router : Router) { 
        this.getAccHolders()
    }

    getAccHolders(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.holders = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() {
     }

    onDelete(acc_no : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteAccHolder(acc_no).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted Account Holder')
                    this.getAccHolders()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }

    onUpdate(acc_no : number) {
        sessionStorage['acc_no'] = acc_no
        this.router.navigate(['/customer-update'])
    }

    onToggle(acc_no : number, toggle_status: number) {
        console.log(acc_no, toggle_status)
        if (toggle_status == 0) {
            console.log("lavdyaa")
            this.service.toggle(1, acc_no).subscribe(response => {
                if(response['status'] == 'success') {
                    console.log(response['data'])
                    this.getAccHolders()
                } else {
                    alert('Error error error')
                    console.log(response['error'])
                }
            })
            
        } else if (toggle_status == 1) {
            console.log("lavdyaa")
            this.service.toggle(0, acc_no).subscribe(response => {
                if(response['status'] == 'success') {
                    console.log(response['data'])
                    this.getAccHolders()
                } else {
                    alert('Error error error')
                    console.log(response['error'])
                }
            })
           
        }
    }
}