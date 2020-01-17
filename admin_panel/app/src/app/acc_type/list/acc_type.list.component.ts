import { Component, OnInit } from '@angular/core';
import { AccTypeService } from '../acc_type.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-acc_type-list',
    templateUrl: './acc_type.list.component.html',
    styleUrls: ['./acc_type.list.component.css']
})

export class AccTypeListComponent implements OnInit {
    acc_types : any[]

    constructor(private service : AccTypeService,
        private router : Router) { 
        this.getAccTypes()
    }

    getAccTypes(){
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.acc_types = response['data']
            } else {
                alert('Error error error')
                console.log(response['error'])
            }
        })
    }

    ngOnInit() { }

    onDelete(type_id : number)
    {
        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteAccType(type_id).subscribe(response => {
                if(response['status'] == ['success']) {
                    alert('Deleted type')
                    this.getAccTypes()
                } else {
                    alert('error error')
                    console.log(response['error'])
                }
            })
        }
    }
}