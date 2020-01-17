import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'aap-customer-login',
    templateUrl: './customer.login.component.html',
    styleUrls: ['./customer.login.component.css']
})

export class CustomerLoginComponent implements OnInit {
    email = ''
    password = ''
    act_status = 0
    
    constructor(private custService : CustomerService,
      private router : Router) { }

    ngOnInit() { }

    onLogin() {
        if (this.email.length == 0) {
          alert('enter valid email')
        } else if (this.password.length == 0) {
          alert('enter valid password')
        } else {
          this.custService
            .login(this.email, this.password)
            .subscribe(response => {
              if (response['status'] == 'success') {
                const customer = response['data']
                this.act_status = customer.activate_status
                if(this.act_status == 0){
                  alert("Your application is not yet acepted...try after some time..!")
                } else if(this.act_status == 1) {
                  alert('authenticated')
                sessionStorage['login_status'] = 1
                this.router.navigate([`/customer-details/${this.email}`])
                console.log(response['data'])
                }
                
              } else {
                alert(response['error'])
                console.log(response['error'])
              }
            })
        }
      }
    
}