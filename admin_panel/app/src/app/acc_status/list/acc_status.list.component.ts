import { Component, OnInit } from '@angular/core';
import { AccStatusService } from '../acc_status.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-acc_status-list',
    templateUrl: './acc_status.list.component.html',
    styleUrls: ['./acc_status.list.component.css']
})

export class AccStatusListComponent implements OnInit {
    acc_statuses : any[]

    constructor(private service : AccStatusService,
        private router : Router) { 
        this.getAccStatus()
    }

    getAccStatus(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.acc_statuses = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() { }

    onDelete(status_id : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteAccStatus(status_id).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted product')
                    this.getAccStatus()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }
}