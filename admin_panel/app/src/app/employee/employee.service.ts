import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  url = 'http://localhost:4000/user'

  constructor(private http: HttpClient) { }

  getEmployee(){
    return this.http.get(this.url);
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.http.post(this.url + '/login', body)
  }

  registerEmployee(user_name: string, user_email: string, user_password: string) {
    const body = {
      user_name: user_name,
      user_email: user_email,
      user_password: user_password
    }

    return this.http.post(this.url + '/register', body)
  }

  deleteEmployee(user_id : number){
    return this.http.delete(this.url + '/' + user_id)
  }


}