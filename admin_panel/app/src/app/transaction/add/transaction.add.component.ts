import { Component, OnInit } from '@angular/core';
import {TransService} from '../transaction.service';

import { Router } from '@angular/router';
import { TransTypeService } from 'src/app/trans_type/trans_type.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction.add.component.html',
  styleUrls: ['./transaction.add.component.css']
})

export class TransactionAddComponent implements OnInit {

  types = []

  acc_no =  0
  trans_type = 0
  trans_amount = 0
  
  constructor(
    private router: Router,
    private transService: TransService,
    private typeService : TransTypeService
    ) {

    this.typeService.get().subscribe(response => {
        if(response['status'] == 'success')
        {
            this.types = response['data']
            this.trans_type = this.types[0].type_id
        } else {
            console.log(response['error'])
        }
    })

  }

  ngOnInit() { }

  onAdd() {
    this.transService
      .addTransaction(this.acc_no, this.trans_type, this.trans_amount)
      .subscribe(response => {
        if (response['status'] == 'success') {
          alert('added transaction in account successfully')
          this.router.navigate(['/transaction-list'])
        } else {
          console.log(response['error'])
        }
      })
  }

  onCancel() {
      this.router.navigate(['/transaction-list'])
  }
}