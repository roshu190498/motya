import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-customer-update',
    templateUrl: './customer.update.component.html',
    styleUrls : ['./customer.update.component.css']
})

export class CustomerUpdateComponent implements OnInit {
    name = ''
    email = ''
    address = ''
    mob_no = ''
    act_status = 0
    acc_no= ''
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private service:CustomerService,) { 
        
            console.log(this.route.snapshot.params)
            this.acc_no = sessionStorage.getItem('acc_no')
            console.log("lavda" + this.acc_no) 
            if(this.acc_no){
                this.service.getAccountDetail(this.acc_no)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log(response['data'])
                        const account=response['data']
                        this.name = account[0].name
                        this.email = account[0].email
                        this.address = account[0].address
                        this.mob_no = account[0].mob_no
                        this.act_status = account[0].activate_status
                    }else{
                        console.log(response['error'])
                    }
                })
            }
        }
updateAccount()
{
    this.service.updateAccount(this.name, this.email,
        this.address, this.mob_no, this.act_status, this.acc_no)
    .subscribe(response=>{
        if(response['status']=='success')
        {
            alert('Updated Succesfully..!')
            this.router.navigate(['/customer-list'])
        }else{
            console.log(response['error'])
        }
    })
}
updateCancel()
{
    this.router.navigate(['/customer-list'])
}


ngOnInit() { }
}