import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee.login.component.html',
  styleUrls: ['./employee.login.component.css']
})

export class EmployeeLoginComponent implements OnInit {
  user_email = ''
  user_password = ''

  constructor(private empService: EmployeeService,
    private router : Router) { }

  ngOnInit() { }

  onLogin() {
    if (this.user_email.length == 0) {
      alert('enter valid email')
    } else if (this.user_password.length == 0) {
      alert('enter valid password')
    } else {
      this.empService
        .login(this.user_email, this.user_password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            alert('authenticated')
            sessionStorage['login_status'] = 1
            sessionStorage['email'] = this.user_email
            this.router.navigate(['/account-list'])
          } else {
            alert(response['error'])
          }
        })
    }
  }

}