import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-list_admin',
    templateUrl: './employee.list_admin.component.html',
    styleUrls: ['./employee.list_admin.component.css']
})

export class EmployeeListAdminComponent implements OnInit {
    employees : any[]

    constructor(private service : EmployeeService,
        private router : Router) { 
        this.getEmployees()
    }

    getEmployees(){
        this.service.getEmployee().subscribe(response => {
            if(response['status'] == 'success') {
                this.employees = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() { }

    onDelete(user_id : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteEmployee(user_id).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted Employee')
                    this.getEmployees()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }

}