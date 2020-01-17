import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { AccTypeService } from 'src/app/acc_type/acc_type.service';
import { AccStatusService } from 'src/app/acc_status/acc_status.service';

@Component({
    selector: 'app-customer-accountInfo',
    templateUrl: './customer.accountInfo.component.html',
    styleUrls : ['./customer.accountInfo.component.css']
})

export class CustomerAccountInfoComponent implements OnInit {
    types = []
    status = []

    acc_no = 0
    name = ''
    bal = 0
    type_id = 0
    type_name = ''
    acc_open_date =''
    status_id = 0
    loan_type = 0
    email = ''
    
    
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private service:AccountService,
        private typeService : AccTypeService,
        private statusService : AccStatusService) { 

            this.typeService.get().subscribe(response => {
                if(response['status'] == 'success') {
                    this.types = response['data']
                } else {
                    console.log(response['error'])
                }
            })
        
            this.statusService.get().subscribe(response => {
                if(response['status'] == 'success')
                {
                    this.status = response['data']
                } else {
                    console.log(response['error'])
                }
            })

            console.log(this.route.snapshot.params)
            this.email=this.route.snapshot.params['email']
            this.acc_no = this.route.snapshot.params['acc_no']
    
            if(this.email){
                this.service.getAccountDetail(this.acc_no)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log(response['data'])
                        const accounts = response['data']
                        this.acc_no = accounts[0].acc_no
                        this.name = accounts[0].acc_holder_name
                        this.bal = accounts[0].acc_balance
                        this.type_id = accounts[0].type_id
                        this.acc_open_date = accounts[0].acc_open_date
                        this.status_id = accounts[0].status_id
                        this.loan_type = accounts[0].loan_type
                    }else{
                        console.log(response['error'])
                    }
                })
            }
        }

    ngOnInit() { }
}