import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccStatusService {
    url = 'http://localhost:4000/acc_status'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

    deleteAccStatus(status_id : number){
        return this.http.delete(this.url + '/' + status_id)
      }

}