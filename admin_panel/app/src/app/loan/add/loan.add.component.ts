import { Component, OnInit } from '@angular/core';
import {LoanService} from '../loan.service';

import { Router } from '@angular/router';
import { LoanTypeService } from 'src/app/loan_type/loan_type.service';
import { LoanStatusService } from 'src/app/loan_status/loan_status.service';


@Component({
  selector: 'app-loan-add',
  templateUrl: './loan.add.component.html',
  styleUrls: ['./loan.add.component.css']
})

export class LoanAddComponent implements OnInit {

  types = []
  status = []

  acc_no =  0
  loan_acc_no = 0
  loan_amount = 0
  type_id = 0
  status_id = 0
  

  constructor(
    private router: Router,
    private loanService: LoanService,
    private typeService : LoanTypeService,
    private statusService : LoanStatusService
    ) {

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

  onAdd() {
    this.loanService
      .addLoanAccount(this.acc_no, this.loan_amount, this.type_id, this.status_id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          alert('added loan account in bank successfully')
          this.router.navigate(['/loan-list'])
        } else {
          console.log(response['error'])
        }
      })
  }

  onCancel() {
      this.router.navigate(['/loan-list'])
  }
}