import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';

@Component({
    selector: 'app-bankservice-list',
    templateUrl: './bankservice.list.component.html',
    styleUrls: ['./bankservice.list.component.css']
})

export class BankserviceListComponent implements OnInit {
    services : any[]
    
    constructor(private service : BankService) {
        this.getServices()
     }

    ngOnInit() { }

     getServices() {
        this.service.get().subscribe(response => {
            if(response['status'] == 'success') {
                this.services = response['data']
            } else {
                console.log(response['error'])
            }
        })
     }

     onDelete(service_id : number ) {

        const answer = confirm('Are you sure you want to delete ?')

        if(answer) {
            this.service.deleteService(service_id).subscribe(response => {
                if(response['status'] == 'success') {
                    alert('Deleted service')
                    this.getServices()
                } else {
                    console.log(response['error'])
                }
            })
        }
    }
}