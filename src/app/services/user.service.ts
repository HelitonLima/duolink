import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { userInterface } from '../models/userInfertace';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  userKey = '$_DUOLINK_USER';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(user: userInterface) {
    return this.http.post<{user: userInterface}>(this.apiUrl + '/user', user);
  }

  login(body: { email: string, password: string }) {
    return this.http.post<{user: userInterface}>(this.apiUrl + '/login', body);
  }

  getUsers(user: userInterface) {
    return this.http.post<userInterface[]>(this.apiUrl + '/duo', user);
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigateByUrl('login');
  }

  setLocalStorage(user: userInterface): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getLocalStorage(): userInterface | undefined {
    const userJSON = localStorage.getItem(this.userKey);

    if (userJSON)
      return JSON.parse(userJSON);
    else
      return undefined;
  }

  verifyUser() {
    if (this.getLocalStorage())
      this.router.navigateByUrl('');
  }
}
