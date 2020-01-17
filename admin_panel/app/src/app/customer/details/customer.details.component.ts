import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer.details.component.html',
    styleUrls : ['./customer.details.component.css']
})

export class CustomerDetailsComponent implements OnInit {
    acc_no = 0
    name = ''
    address = ''
    mob_no = ''
    open_bal = ''
    email = ''
    
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private service:CustomerService,) { 

            console.log(this.route.snapshot.params)
            this.email=this.route.snapshot.params['email']
            if(this.email){
                this.service.getAccHolderDetail(this.email)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log(response['data'])
                        const holders = response['data']
                        this.acc_no = holders[0].acc_no
                        this.name = holders[0].name
                        this.address = holders[0].address
                        this.mob_no = holders[0].mob_no
                        this.open_bal = holders[0].acc_bal            
                    }else{
                        console.log(response['error'])
                    }
                })
            }
        }

    ngOnInit() { }
}