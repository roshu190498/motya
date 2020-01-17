import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  url = 'http://localhost:4000/user'

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.http.post(this.url + '/adminLogin', body)
  }

 
}