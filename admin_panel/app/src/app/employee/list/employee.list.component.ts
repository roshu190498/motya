import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee.list.component.html',
    styleUrls: ['./employee.list.component.css']
})

export class EmployeeListComponent implements OnInit {
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

}