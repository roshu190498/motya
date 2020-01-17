import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee.registration.component.html',
  styleUrls: ['./employee.registration.component.css']
})

export class EmployeeRegisterComponent implements OnInit {
  user_name = ''
  user_email = ''
  user_password = ''
  

  constructor(
    private router: Router,
    private empService: EmployeeService) { }

  ngOnInit() { }

  onRegistration() {
    if (this.user_name.length == 0) {
      alert('enter valid username')
    } else if (this.user_email.length == 0) {
      alert('enter valid email')
    } else if (this.user_password.length == 0) {
      alert('enter valid password')
    } else {
      this.empService
        .registerEmployee(this.user_name, this.user_email, this.user_password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            alert('registered successfully')
            this.router.navigate(['/employee-login'])
          } else {
            alert(response['error'])
          }
        })
    }
  }
}