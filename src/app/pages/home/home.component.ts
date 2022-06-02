import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/models/userInfertace';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
}
