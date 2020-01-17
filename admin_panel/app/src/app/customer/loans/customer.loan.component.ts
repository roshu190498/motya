import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import { LoanTypeService } from 'src/app/loan_type/loan_type.service';
import { LoanStatusService } from 'src/app/loan_status/loan_status.service';
import { LoanService } from 'src/app/loan/loan.service';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-loan',
  templateUrl: './customer.loan.component.html',
  styleUrls: ['./customer.loan.component.css']
})

export class CustomerLoanComponent implements OnInit {

  types = []
  status = []
  email = ''
  acc_no =  0
  loan_amount = 0
  type_id = 0
  status_id = 1
  

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private service : CustomerService,
    private loanService: LoanService,
    private typeService : LoanTypeService,
    private statusService : LoanStatusService
    ) {
      this.email = this.route.snapshot.params['email']

      if(this.email){
        this.service.getAccHolderDetail(this.email)
        .subscribe(response=>{
            if(response['status']=='success')
            {
                console.log(response['data'])
                const holders = response['data']
                this.acc_no = holders[0].acc_no           
            }else{
                console.log(response['error'])
            }
        })
    }
      
      this.typeService.get().subscribe(response => {
        if(response['status'] == 'success')
        {
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
  }

  ngOnInit() { }

  onApply() {
    this.loanService
      .addLoanAccount(this.acc_no,  this.loan_amount, this.type_id, this.status_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          alert('Applied for loan in bank successfully')
          this.router.navigate([`/customer-details/${this.email}`])
        } else {
          console.log(response['error'])
        }
      })
  }

  onCancel() {
      this.router.navigate([`/customer-details/${this.email}`])
  }
}