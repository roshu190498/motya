import { Component, OnInit } from '@angular/core';
import {BankService} from '../bank.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-bankservice-add',
  templateUrl: './bankservice.add.component.html',
  styleUrls: ['./bankservice.add.component.css']
})

export class BankserviceAddComponent implements OnInit {

    Service = ''

    constructor(
        private router: Router,
        private service: BankService,
        ) {}

  ngOnInit() { }

  onAdd() {

    if(this.Service.length == 0) {
        alert('Enter valid service')
    } else {
        this.service
          .addService(this.Service)
          .subscribe(response => {
            if (response['status'] == 'success') {
              alert('added service in bank successfully')
              this.router.navigate(['/bankservice-list'])
            } else {
              console.log(response['error'])
            }
          })
    }
  }

  onCancel() {
      this.router.navigate(['/bankservice-list'])
  }
}