import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';

import { Router } from '@angular/router';
import { AccTypeService } from '../../acc_type/acc_type.service';
import { AccStatusService } from '../../acc_status/acc_status.service';
import { LoanTypeService } from '../../loan_type/loan_type.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account.add.component.html',
  styleUrls: ['./account.add.component.css']
})

export class AccountAddComponent implements OnInit {

  types = []
  status = []
  loans = []

  sr_no = 0
  acc_no =  0
  acc_holder_name = ''
  type_id = 0
  acc_balance = 0
  acc_open_date = ''
  status_id = 0
  loan_type = 0

  constructor(
    private router: Router,
    private accountService: AccountService,
    private typeService : AccTypeService,
    private statusService : AccStatusService,
    private loanService : LoanTypeService) {

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

    this.loanService.get().subscribe(response => {
        if(response['status'] == 'success')
        {
            this.loans = response['data']
            this.loan_type = this.loans[0].type_id
        } else {
            console.log(response['error'])
        }
    })
  }

  ngOnInit() { }

  onAdd() {
    this.accountService
      .addAccount(this.sr_no, this.acc_no, this.acc_holder_name, this.type_id, this.acc_balance, this.acc_open_date, this.status_id,this.loan_type)
      .subscribe(response => {
        if (response['status'] == 'success') {
          alert('added account in bank successfully')
          this.router.navigate(['/account-list'])
        } else {
          console.log(response['error'])
        }
      })
  }

  onCancel() {
      this.router.navigate(['/account-list'])
  }
}