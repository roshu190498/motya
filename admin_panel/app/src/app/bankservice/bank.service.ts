import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BankService {

    url = 'http://localhost:4000/bankservice'

    constructor(private http : HttpClient) { }

    get() {
        return this.http.get(this.url)
    }

    deleteService(service_id : number) {
        return this.http.delete(this.url + '/' + service_id)
    }

    addService(service : string) {
        
        const body = {
            service :service
        }
        
        return this.http.post(this.url, body)
        
    }
}