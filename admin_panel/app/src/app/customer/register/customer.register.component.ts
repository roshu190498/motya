import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-register',
    templateUrl: './customer.register.component.html',
    styleUrls : ['./customer.register.component.css']
})

export class CustomerRegisterComponent implements OnInit {
    name = ''
    address = ''
    mob_no = 0
    email = ''
    password = ''
    open_bal = 0

    constructor(private custService : CustomerService,
        private router : Router) { }

    ngOnInit() { }

    onRegister(){


        if (this.name.length == 0) {
            alert('enter valid name')
          } else if (this.address.length == 0) {
            alert('enter valid address')
          } else if (this.email.length == 0) {
            alert('enter valid email')
          } else if (this.password.length == 0) {
            alert('enter valid password')
          } else {
            this.custService.registerCustomer
            (this.name, this.address, this.mob_no, this.email, this.password, this.open_bal)
            .subscribe(response => {
            if(response['status'] == 'success') {
            alert('Register Succesfully')
            this.router.navigate(['/customer-login'])
            
            } else {
            alert(`error error`)
            console.log(response['error'])
            }
        })
    }
    }
}