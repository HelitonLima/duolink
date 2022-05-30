import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: any) {
    return this.http.post(this.apiUrl + '/user', user)
  }
}
