import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccTypeService {
    url = 'http://localhost:4000/acc_type'

    constructor(private http: HttpClient) { }

    get(){
        return this.http.get(this.url)
    }

    deleteAccType(type_id : number){
        return this.http.delete(this.url + '/' + type_id)
      }

}