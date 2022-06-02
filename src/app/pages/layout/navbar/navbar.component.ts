import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/models/userInfertace';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedUser: userInterface = this.getUser();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  getUser(): userInterface {
    const user = this.userService.getLocalStorage();

    if (user)
      return user;
    else
      return {
        email: '',
        name: '',
        nickname: '',
        playRole: [{icon: '', name: ''}],
        searchRole: [{icon: '', name: ''}],
      }
  }

  logout() {
    this.userService.logout();
  }

}
