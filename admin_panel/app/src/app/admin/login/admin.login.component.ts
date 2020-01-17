import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin.login.component.html',
  styleUrls: ['./admin.login.component.css']
})

export class AdminLoginComponent implements OnInit {
  email = ''
  password = ''

  constructor(private adminService: AdminService,
    private router : Router) { }

  ngOnInit() { }

  onLogin() {
    if (this.email.length == 0) {
      alert('enter valid email')
    } else if (this.password.length == 0) {
      alert('enter valid password')
    } else {
      this.adminService
        .login(this.email, this.password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            alert('authenticated')
            this.router.navigate(['/employee-list_admin'])
          } else {
            alert(response['error'])
          }
        })
    }
  }

}