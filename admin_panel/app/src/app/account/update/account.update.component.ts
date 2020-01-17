import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccTypeService } from '../../acc_type/acc_type.service';
import { AccStatusService } from '../../acc_status/acc_status.service';

@Component({
    selector: 'app-account-update',
    templateUrl: './account.update.component.html',
    styleUrls : ['./account.update.component.css']
})

export class AccountUpdateComponent implements OnInit {
    types = []
    status = []
    
    type_id = 0
    acc_balance = 0
    status_id = 0
    acc_no=0
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private service:AccountService,
        private typeService : AccTypeService,
        private statusService : AccStatusService) { 

            this.typeService.get().subscribe(response => {
                if(response['status'] == 'success') {
                    this.types = response['data']
                    this.type_id = this.types[0].type_id
                } else {
                    console.log(response['error'])
                }
            })
        
            this.statusService.get().subscribe(response => {
                if(response['status'] == 'success')
                {
                    this.status = response['data']
                    this.status_id = this.status[0].status_id
                } else {
                    console.log(response['error'])
                }
            })
        
            console.log(this.route.snapshot.params)
            this.acc_no=this.route.snapshot.params['acc_no']
            if(this.acc_no){
                this.service.getAccountDetail(this.acc_no)
                .subscribe(response=>{
                    if(response['status']=='success')
                    {
                        console.log(response['data'])
                        const account=response['data']
                        this.type_id=account[0].type_id
                        this.acc_balance=account[0].acc_balance
                        this.status_id =account[0].status_id 
                    }else{
                        console.log(response['error'])
                    }
                })
            }
        }
updateAccount()
{
    this.service.updateAccount(this.type_id,this.acc_balance,this.status_id,this.acc_no)
    .subscribe(response=>{
        if(response['status']=='success')
        {
            alert('updated account balance, account type , account status')
            this.router.navigate(['/account-list'])
        }else{
            console.log(response['error'])
        }
    })
}
updateCancel()
{
    this.router.navigate(['/account-list'])
}
    ngOnInit() { }
}